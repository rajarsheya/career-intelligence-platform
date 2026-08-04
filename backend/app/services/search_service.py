from sqlalchemy import or_

from backend.app.models.opportunity import Opportunity


def search_opportunities(db, query):

    return (
        db.query(Opportunity)
        .filter(
            or_(
                Opportunity.title.ilike(
                    f"%{query}%"
                ),
                Opportunity.organization.ilike(
                    f"%{query}%"
                ),
                Opportunity.description.ilike(
                    f"%{query}%"
                ),
                Opportunity.requirements.ilike(
                    f"%{query}%"
                ),
                Opportunity.country.ilike(
                    f"%{query}%"
                ),
            )
        )
        .all()
    )


def get_similar_opportunities(
    db,
    opportunity,
):

    return (
        db.query(Opportunity)
        .filter(
            Opportunity.id != opportunity.id,
            or_(
                Opportunity.country
                == opportunity.country,

                Opportunity.opportunity_type
                == opportunity.opportunity_type,
            ),
        )
        .limit(10)
        .all()
    )