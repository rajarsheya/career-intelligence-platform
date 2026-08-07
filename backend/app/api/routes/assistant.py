from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.api.dependencies import get_db

from backend.app.schemas.assistant import (
AssistantRequest,
AssistantResponse,
)

from backend.app.services.assistant_service import (
ask_assistant,
)

router = APIRouter(
prefix="/assistant",
tags=["AI Assistant"],
)

@router.post(
"/",
response_model=AssistantResponse,
)
def assistant(
request: AssistantRequest,
db: Session = Depends(get_db),
):
    return ask_assistant(
        db=db,
        query=request.query,
    )
