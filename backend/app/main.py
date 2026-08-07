from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.opportunities import router as opportunity_router
from backend.app.api.routes.scraper import router as scraper_router

from backend.app.exceptions.handlers import (
    OpportunityNotFoundException,
    opportunity_not_found_handler,
    generic_exception_handler,
)

from backend.app.api.routes.recommendations import (
    router as recommendation_router,
)

from backend.app.api.routes.assistant import (
    router as assistant_router,
)

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

# Register API routers
app.include_router(opportunity_router)
app.include_router(recommendation_router)
app.include_router(assistant_router)
app.include_router(scraper_router)

app.add_exception_handler(
    OpportunityNotFoundException,
    opportunity_not_found_handler
)

app.add_exception_handler(
    Exception,
    generic_exception_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)