from datetime import date
from typing import Optional

from pydantic import BaseModel,ConfigDict


class OpportunityBase(BaseModel):
    title: str
    organization: Optional[str] = None
    opportunity_type: Optional[str] = None
    country: Optional[str] = None
    deadline: Optional[date] = None
    url: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None


class OpportunityCreate(OpportunityBase):
    pass

class OpportunityResponse(OpportunityBase):
    id: int

    model_config = ConfigDict(from_attributes=True)