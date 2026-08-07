from pydantic import BaseModel

class RecommendationResponse(BaseModel):
    message: str
    recommendations: list

class AssistantRequest(BaseModel):
    query: str

class AssistantResponse(BaseModel):
    answer: str
    opportunities: list
