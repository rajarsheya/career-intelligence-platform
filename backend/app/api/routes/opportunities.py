from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.api.dependencies import get_db
from backend.app.schemas.opportunity import OpportunityResponse
from backend.app.services.opportunity_service import (
    get_all_opportunities,
    get_opportunity,
)

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"],
)


@router.get(
    "/",
    response_model=list[OpportunityResponse],
)
def list_opportunities(
    country: str | None = None,
    opportunity_type: str | None = None,
    organization: str | None = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):

    return get_all_opportunities(
        db=db,
        country=country,
        opportunity_type=opportunity_type,
        organization=organization,
        skip=skip,
        limit=limit,
    )


@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def retrieve_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db),
):

    opportunity = get_opportunity(
        db,
        opportunity_id,
    )

    if opportunity is None:

        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return opportunity