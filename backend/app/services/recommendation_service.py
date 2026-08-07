from backend.app.services.matching_service import match_resume

def recommend_opportunities(
db,
resume_text: str,
limit: int = 10,
):
    """
    Generate opportunity recommendations based
    on the semantic similarity between the
    resume and opportunity embeddings.
    """

    if not resume_text or not resume_text.strip():
        return []

    return match_resume(
        db=db,
        resume_text=resume_text,
        limit=limit,
    )

