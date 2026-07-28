from scrapers.base_scraper import BaseScraper
from scrapers.fetcher import Fetcher


class DAADScraper(BaseScraper):

    URL = "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/"

    def fetch(self):

        fetcher = Fetcher()

        return fetcher.get(self.URL)

    def parse(self, raw_data):

        return []