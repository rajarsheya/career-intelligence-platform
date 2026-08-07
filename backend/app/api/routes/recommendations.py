from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from backend.app.api.dependencies import get_db
from backend.app.services.resume_service import (
    extract_resume_text,
)
from backend.app.services.recommendation_service import (
    recommend_opportunities,
)
from backend.app.schemas.opportunity import (
    OpportunityResponse,
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.post(
    "/",
    response_model=list[OpportunityResponse],
)
async def get_recommendations(
    file: UploadFile = File(...),
    limit: int = 10,
    db: Session = Depends(get_db),
):
    """
    Upload a resume PDF and return
    semantically matched opportunities.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF resumes are supported.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded resume is empty.",
        )

    temp_path = "temp_resume.pdf"

    try:
        with open(
            temp_path,
            "wb",
        ) as resume_file:
            resume_file.write(contents)

        resume_text = extract_resume_text(
            temp_path
        )

    finally:
        import os

        if os.path.exists(temp_path):
            os.remove(temp_path)

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from the resume.",
        )

    recommendations = recommend_opportunities(
        db=db,
        resume_text=resume_text,
        limit=limit,
    )

    return recommendations