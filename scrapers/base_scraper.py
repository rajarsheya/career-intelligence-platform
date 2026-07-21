from abc import ABC, abstractmethod


class BaseScraper(ABC):

    @abstractmethod
    def fetch(self):
        pass

    @abstractmethod
    def parse(self, raw_data):
        pass

    def validate(self, opportunities):

        return opportunities

    def scrape(self):

        raw = self.fetch()

        parsed = self.parse(raw)

        validated = self.validate(parsed)

        return validated