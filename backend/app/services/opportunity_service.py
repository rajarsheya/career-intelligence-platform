from sqlalchemy.orm import Session
from sqlalchemy import or_

from scrapers.utils.normalizer import Normalizer
from scrapers.utils.validator import Validator

from backend.app.database.database import SessionLocal
from backend.app.models.opportunity import Opportunity

from backend.app.schemas.opportunity import OpportunityCreate


def opportunity_exists(db, title, organization):

    return (
        db.query(Opportunity)
        .filter(
            Opportunity.title == title,
            Opportunity.organization == organization,
        )
        .first()
        is not None
    )


def save_opportunities(opportunities):
    db = SessionLocal()
    try:
        for item in opportunities:
            if opportunity_exists(
                db,
                item.title,
                item.organization,
            ):
                continue
            if not Validator.validate(item):
                continue
            opportunity = Opportunity(
                title=Normalizer.normalize_title(item.title),
                organization=Normalizer.normalize_organization(item.organization),
                opportunity_type=item.opportunity_type,
                country=Normalizer.normalize_country(item.country),
                deadline=item.deadline,
                url=Normalizer.normalize_url(item.url),
                description=item.description,
                requirements=item.requirements
            )
            db.add(opportunity)
        db.commit()
    finally:
        db.close()


def get_all_opportunities(
    db: Session,
    country: str | None = None,
    opportunity_type: str | None = None,
    organization: str | None = None,
    skip: int = 0,
    limit: int = 20,
):  
    query = db.query(Opportunity)
    if country:
        query = query.filter(Opportunity.country == country)
    if opportunity_type:
        query = query.filter(
            Opportunity.opportunity_type == opportunity_type
        )
    if organization:
        query = query.filter(
            Opportunity.organization == organization
        )
    return query.offset(skip).limit(limit).all()


def get_opportunity(db: Session, opportunity_id: int):
    return (
        db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )


def create_opportunity(
    db: Session,
    opportunity: OpportunityCreate,
):
    db_opportunity = Opportunity(**opportunity.model_dump())
    db.add(db_opportunity)
    db.commit()
    db.refresh(db_opportunity)
    return db_opportunity


def update_opportunity(
    db: Session,
    opportunity_id: int,
    updated_opportunity: OpportunityCreate,
):
    db_opportunity = (
        db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )
    if db_opportunity is None:
        return None
    update_data = updated_opportunity.model_dump()
    for key, value in update_data.items():
        setattr(db_opportunity, key, value)
    db.commit()
    db.refresh(db_opportunity)
    return db_opportunity


def search_opportunities(
    db: Session,
    keyword: str,
):
    return (
        db.query(Opportunity)
        .filter(
            or_(
                Opportunity.title.ilike(f"%{keyword}%"),
                Opportunity.organization.ilike(f"%{keyword}%"),
                Opportunity.description.ilike(f"%{keyword}%"),
            )
        )
        .all()
    )