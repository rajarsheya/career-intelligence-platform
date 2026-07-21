from scrapers.sources.daad_scraper import DAADScraper
from backend.app.services.opportunity_service import save_opportunities


def main():

    scraper = DAADScraper()

    opportunities = scraper.scrape()

    save_opportunities(opportunities)

    print("Done!")


if __name__ == "__main__":
    main()