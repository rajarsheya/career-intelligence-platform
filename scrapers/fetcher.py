import random
import time

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from backend.app.core.config import (
    USER_AGENTS,
    REQUEST_TIMEOUT,
)
from backend.app.core.logger import logger


class Fetcher:

    def __init__(self):

        self.session = requests.Session()

        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET"],
        )

        adapter = HTTPAdapter(max_retries=retry_strategy)

        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

    def get(self, url: str):

        logger.info("Fetching %s", url)

        time.sleep(random.uniform(0.5, 1.5))

        response = self.session.get(
            url,
            headers={
                "User-Agent": random.choice(USER_AGENTS)
            },
            timeout=REQUEST_TIMEOUT,
        )

        response.raise_for_status()

        logger.info(
            "Received HTTP %d from %s",
            response.status_code,
            url,
        )

        return response.text