from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import users_collection
from models import UserSignup, UserLogin, UserResponse, Token
from auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from bson import ObjectId

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173", # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to MoneyWise Backend!"}

@app.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user: UserSignup):
    # Check if user already exists (by email or username)
    existing_user = await users_collection.find_one({
        "$or": [{"email": user.email}, {"username": user.username}]
    })
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or Username already registered"
        )

    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user dict
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    
    # Insert into DB
    result = await users_collection.insert_one(user_dict)
    
    # Return created user
    return UserResponse(
        id=str(result.inserted_id),
        username=user.username,
        email=user.email
    )

@app.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    # Find user by email OR username (since frontend has "Email / Username" field)
    user = await users_collection.find_one({
        "$or": [
            {"email": user_credentials.identifier},
            {"username": user_credentials.identifier}
        ]
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create Access Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
