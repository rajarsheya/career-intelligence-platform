from scrapers.base_scraper import BaseScraper
from scrapers.opportunity import OpportunityData


class MockScraper(BaseScraper):

    def fetch(self):
        """
        Normally this would download HTML or JSON.
        Since this is a mock scraper, we simply return dummy data.
        """
        return "mock_data"

    def parse(self, raw_data):
        """
        Convert the raw data into OpportunityData objects.
        """

        return [

            OpportunityData(

                title="Software Engineering Internship",

                organization="Google",

                opportunity_type="Internship",

                country="United States",

                deadline=None,

                url="https://careers.google.com",

                description="Summer internship.",

                requirements="Python"

            ),

            OpportunityData(

                title="AI Research Fellowship",

                organization="OpenAI",

                opportunity_type="Fellowship",

                country="United States",

                deadline=None,

                url="https://openai.com",

                description="Research Fellowship",

                requirements="Machine Learning"

            )

        ]