from backend.app.services.matching_service import (
    match_resume,
)


def recommend_opportunities(
    db,
    resume_text: str,
    limit: int = 10,
):

    return match_resume(
        db=db,
        resume_text=resume_text,
        limit=limit,
    )