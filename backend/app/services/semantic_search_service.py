from backend.app.models.opportunity import Opportunity

from backend.app.services.embedding_service import (
    embedding_service,
)


def semantic_search(
    db,
    query: str,
    limit: int = 10,
):

    query_embedding = (
        embedding_service.generate_embedding(
            query
        )
    )

    results = (
        db.query(Opportunity)
        .filter(
            Opportunity.embedding.is_not(None)
        )
        .order_by(
            Opportunity.embedding.cosine_distance(
                query_embedding
            )
        )
        .limit(limit)
        .all()
    )

    return results