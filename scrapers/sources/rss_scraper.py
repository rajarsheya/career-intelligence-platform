import feedparser

from scrapers.base_scraper import BaseScraper
from scrapers.opportunity import OpportunityData


class RSSScraper(BaseScraper):

    RSS_URL = ""

    def fetch(self):
        return feedparser.parse(self.RSS_URL)

    def parse(self, feed):

        opportunities = []

        for entry in feed.entries:

            opportunities.append(

                OpportunityData(

                    title=entry.get("title"),

                    organization="Unknown",

                    opportunity_type="Scholarship",

                    country=None,

                    deadline=None,

                    url=entry.get("link"),

                    description=entry.get("summary", ""),

                    requirements=None,

                )

            )

        return opportunities