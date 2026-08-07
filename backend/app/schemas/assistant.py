from pydantic import BaseModel

from backend.app.schemas.opportunity import (
    OpportunityResponse,
)


class AssistantRequest(BaseModel):
    query: str


class AssistantResponse(BaseModel):
    answer: str
    opportunities: list[OpportunityResponse]