import requests

from backend.app.core.config import USER_AGENT, REQUEST_TIMEOUT


class Fetcher:

    @staticmethod
    def get(url: str):

        response = requests.get(
            url,
            headers={
                "User-Agent": USER_AGENT
            },
            timeout=REQUEST_TIMEOUT
        )

        response.raise_for_status()

        return response.text