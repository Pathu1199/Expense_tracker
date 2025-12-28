# MoneyWise Backend

This is the FastAPI backend for MoneyWise.

## Setup

1.  **Install Python Dependencies**:
    ```bash
    cd Backend
    pip install -r requirements.txt
    ```

2.  **MongoDB**:
    Ensure you have MongoDB running locally on port 27017, or set `MONGO_URL` environment variable.

## Running the Server

Run the development server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
Docs are available at `http://localhost:8000/docs`.

## API Endpoints

- `POST /signup`: Create a new account.
- `POST /login`: Authenticate and get JWT token.
