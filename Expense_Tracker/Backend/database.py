from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Force reload of environment variables from .env
load_dotenv(override=True)

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "moneywise_db")

if not MONGO_URL:
    raise ValueError("MONGO_URL not found in environment. Please check your .env file.")

# For debugging (safe version)
masked_url = f"{MONGO_URL[:10]}...{MONGO_URL[-10:]}" if MONGO_URL else "None"
print(f"DEBUG: MONGO_URL length: {len(MONGO_URL) if MONGO_URL else 0}")
print(f"DEBUG: MONGO_URL points to: {masked_url}")
# Hostname part
if MONGO_URL and '@' in MONGO_URL:
    print(f"DEBUG: Hostname part: {MONGO_URL.split('@')[-1].split('/')[0]}")
else:
    print(f"DEBUG: No @ found in URL or URL is empty")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
users_collection = db["users"]
