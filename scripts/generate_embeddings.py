from backend.app.database.database import SessionLocal

from backend.app.models.opportunity import Opportunity

from backend.app.services.embedding_service import (
    embedding_service,
    build_opportunity_text,
)


def generate_embeddings():

    db = SessionLocal()

    try:

        opportunities = (
            db.query(Opportunity)
            .filter(
                Opportunity.embedding.is_(None)
            )
            .all()
        )

        print(
            f"Found {len(opportunities)} opportunities"
        )

        for opportunity in opportunities:

            text = build_opportunity_text(
                opportunity
            )

            embedding = (
                embedding_service
                .generate_embedding(text)
            )

            opportunity.embedding = embedding

            print(
                f"Embedded: {opportunity.title}"
            )

        db.commit()

        print("Embedding generation complete.")

    finally:

        db.close()


if __name__ == "__main__":

    generate_embeddings()