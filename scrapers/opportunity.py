from dataclasses import dataclass
from typing import Optional
from datetime import date


@dataclass
class OpportunityData:

    title: str

    organization: str

    opportunity_type: str

    country: Optional[str]

    deadline: Optional[date]

    url: str

    description: str

    requirements: Optional[str]