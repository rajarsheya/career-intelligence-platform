from fastapi import FastAPI

app = FastAPI(
    title="Scholarship & Career Intelligence Platform",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Scholarship & Career Intelligence Platform!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }