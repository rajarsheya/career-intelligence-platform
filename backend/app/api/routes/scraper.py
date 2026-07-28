from fastapi import APIRouter, BackgroundTasks

from scrapers.run_scraper import run_scraper

router = APIRouter(
    prefix="/scrapers",
    tags=["Scrapers"],
)


@router.post("/run")
def run(background_tasks: BackgroundTasks):

    background_tasks.add_task(run_scraper)

    return {
        "message": "Scraper started in the background."
    }