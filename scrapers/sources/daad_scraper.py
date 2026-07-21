from scrapers.base_scraper import BaseScraper
from scrapers.fetcher import Fetcher


class DAADScraper(BaseScraper):

    URL = "https://www.daad.de/en/studying-in-germany/scholarships/"

    def fetch(self):
        return Fetcher.get(self.URL)

    def parse(self, raw_data):
        return []