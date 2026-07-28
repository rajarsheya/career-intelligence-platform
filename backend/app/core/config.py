from dotenv import load_dotenv
import os

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL")

# HTTP Requests
USER_AGENTS = [
    os.getenv(
        "USER_AGENT_1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
    ),
    os.getenv(
        "USER_AGENT_2",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
    ),
    os.getenv(
        "USER_AGENT_3",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"
    ),
]

REQUEST_TIMEOUT = int(
    os.getenv("REQUEST_TIMEOUT", 30)
)