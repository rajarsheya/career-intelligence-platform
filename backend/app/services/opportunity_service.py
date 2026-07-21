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