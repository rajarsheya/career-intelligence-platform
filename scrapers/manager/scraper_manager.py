from backend.app.core.logger import logger

from scrapers.sources.mock_scraper import MockScraper
from scrapers.sources.sample_rss_scraper import SampleRSSScraper
#from scrapers.sources.daad_scraper import DAADScraper


class ScraperManager:

    def __init__(self):

        self.scrapers = [
            MockScraper(),
            SampleRSSScraper(),
            #DAADScraper(),
        ]

    def run_all(self):

        all_opportunities = []

        for scraper in self.scrapers:

            logger.info(
                "Running %s",
                scraper.__class__.__name__,
            )

            opportunities = scraper.scrape()

            logger.info(
                "%s returned %d opportunities",
                scraper.__class__.__name__,
                len(opportunities),
            )

            all_opportunities.extend(opportunities)

        logger.info(
            "Collected %d opportunities",
            len(all_opportunities),
        )

        return all_opportunities