from sqlalchemy import select

from backend.app.models.opportunity import Opportunity

from backend.app.services.embedding_service import (
    embedding_service,
)


def match_resume(
    db,
    resume_text: str,
    limit: int = 10,
):

    resume_embedding = (
        embedding_service.generate_embedding(
            resume_text
        )
    )

    results = (
        db.query(Opportunity)
        .filter(
            Opportunity.embedding.is_not(None)
        )
        .order_by(
            Opportunity.embedding.cosine_distance(
                resume_embedding
            )
        )
        .limit(limit)
        .all()
    )

    return results