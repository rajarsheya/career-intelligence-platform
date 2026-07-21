from scrapers.sources.mock_scraper import MockScraper
from backend.app.services.opportunity_service import save_opportunities

def main():

    scraper = MockScraper()

    opportunities = scraper.scrape()

    save_opportunities(opportunities)

    print("Done!")


if __name__ == "__main__":

    main()