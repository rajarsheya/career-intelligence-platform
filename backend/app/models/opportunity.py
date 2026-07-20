from sqlalchemy import Column, Integer, String, Text, Date

from backend.app.database.database import Base


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(300), nullable=False)

    organization = Column(String(200))

    opportunity_type = Column(String(100))

    country = Column(String(100))

    deadline = Column(Date)

    url = Column(String(500))

    description = Column(Text)

    requirements = Column(Text)