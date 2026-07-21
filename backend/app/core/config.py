from dotenv import load_dotenv
import os

load_dotenv()

# Database
DATABASE_URL = os.getenv("DATABASE_URL")

# HTTP Requests
USER_AGENT = os.getenv(
    "USER_AGENT",
    "ScholarshipCareerPlatform/1.0"
)

REQUEST_TIMEOUT = int(
    os.getenv("REQUEST_TIMEOUT", 30)
)