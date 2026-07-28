from scrapers.sources.mock_scraper import MockScraper
from backend.app.services.opportunity_service import save_opportunities
from backend.app.core.logger import logger
from scrapers.manager.scraper_manager import ScraperManager

def run_scraper():

    logger.info("Starting scraper manager")

    manager = ScraperManager()

    opportunities = manager.run_all()

    save_opportunities(opportunities)

    logger.info(
        "Saved %d opportunities",
        len(opportunities),
    )

    return {
        "message": "Scraping completed successfully.",
        "opportunities_added": len(opportunities),
    }

def main():
    result = run_scraper()
    print(result)


if __name__ == "__main__":
    main()