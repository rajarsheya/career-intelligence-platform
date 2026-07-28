from urllib.parse import urlparse


class Normalizer:

    @staticmethod
    def normalize_title(title):

        if not title:
            return None

        return " ".join(title.split())

    @staticmethod
    def normalize_organization(org):

        if not org:
            return "Unknown"

        return org.strip().title()

    @staticmethod
    def normalize_country(country):

        if not country:
            return None

        country = country.strip()

        mapping = {
            "USA": "United States",
            "US": "United States",
            "U.S.A.": "United States",
            "UK": "United Kingdom",
        }

        return mapping.get(country, country)

    @staticmethod
    def normalize_url(url):

        if not url:
            return None

        parsed = urlparse(url)

        return parsed.geturl()