from sqlalchemy.orm import Session

from backend.app.database.database import SessionLocal
from backend.app.models.opportunity import Opportunity


def save_opportunities(opportunities):

    db = SessionLocal()

    try:

        for item in opportunities:

            opportunity = Opportunity(

                title=item.title,

                organization=item.organization,

                opportunity_type=item.opportunity_type,

                country=item.country,

                deadline=item.deadline,

                url=item.url,

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