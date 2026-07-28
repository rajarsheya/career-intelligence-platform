from urllib.parse import urlparse


class Validator:

    @staticmethod
    def valid_title(title):

        return bool(title and len(title.strip()) >= 3)

    @staticmethod
    def valid_url(url):

        if not url:
            return False

        parsed = urlparse(url)

        return bool(parsed.scheme and parsed.netloc)

    @staticmethod
    def valid_organization(org):

        return bool(org and org.strip())

    @staticmethod
    def validate(opportunity):

        return (
            Validator.valid_title(opportunity.title)
            and Validator.valid_url(opportunity.url)
            and Validator.valid_organization(
                opportunity.organization
            )
        )