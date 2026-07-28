from scrapers.sources.mock_scraper import MockScraper
from backend.app.services.opportunity_service import save_opportunities
from backend.app.core.logger import logger


def run_scraper():

    

    scraper = MockScraper()

    opportunities = scraper.scrape()

    save_opportunities(opportunities)

    return {
        "message": "Scraping completed successfully.",
        "opportunities_added": len(opportunities),
    }


def main():
    result = run_scraper()
    print(result)


if __name__ == "__main__":
    main()