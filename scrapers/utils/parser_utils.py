from datetime import datetime
from urllib.parse import urljoin

from bs4 import BeautifulSoup


class ParserUtils:

    @staticmethod
    def parse_html(html):

        return BeautifulSoup(
            html,
            "html.parser",
        )

    @staticmethod
    def extract_text(element, selector):

        item = element.select_one(selector)

        if item:
            return item.get_text(strip=True)

        return None

    @staticmethod
    def extract_attribute(element, selector, attribute):

        item = element.select_one(selector)

        if item:
            return item.get(attribute)

        return None

    @staticmethod
    def extract_link(element):

        link = element.find("a")

        if link:
            return link.get("href")

        return None

    @staticmethod
    def clean_text(text):

        if not text:
            return None

        return " ".join(text.split())

    @staticmethod
    def parse_date(date_string):

        if not date_string:
            return None

        formats = [
            "%d %B %Y",
            "%Y-%m-%d",
            "%d/%m/%Y",
            "%m/%d/%Y",
        ]

        for fmt in formats:

            try:
                return datetime.strptime(
                    date_string,
                    fmt,
                ).date()

            except ValueError:
                continue

        return None

    @staticmethod
    def absolute_url(base_url, url):

        if not url:
            return None

        return urljoin(
            base_url,
            url,
        )