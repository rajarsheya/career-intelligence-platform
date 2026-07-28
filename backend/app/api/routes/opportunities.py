from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException

from backend.app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityResponse,
)

from backend.app.api.dependencies import get_db
from backend.app.schemas.opportunity import OpportunityResponse
from backend.app.services.opportunity_service import (
    get_all_opportunities,
    get_opportunity,
    create_opportunity,
    update_opportunity,
    search_opportunities,
)

from backend.app.exceptions.handlers import (
    OpportunityNotFoundException
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


@router.post(
    "/",
    response_model=OpportunityResponse,
    status_code=201,
)
def create(
    opportunity: OpportunityCreate,
    db: Session = Depends(get_db),
):
    return create_opportunity(
        db=db,
        opportunity=opportunity,
    )


@router.put(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def update(
    opportunity_id: int,
    opportunity: OpportunityCreate,
    db: Session = Depends(get_db),
):
    updated = update_opportunity(
        db=db,
        opportunity_id=opportunity_id,
        updated_opportunity=opportunity,
    )
    if updated is None:
        raise OpportunityNotFoundException(
            f"Opportunity {opportunity_id} not found"
        )
    return updated


@router.get(
    "/search",
    response_model=list[OpportunityResponse],
)
def search(
    q: str,
    db: Session = Depends(get_db),
):
    return search_opportunities(
        db=db,
        keyword=q,
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

        raise OpportunityNotFoundException(
            f"Opportunity {opportunity_id} not found"
        )

    return opportunity