from sqlalchemy import Column, Integer, String

from db import Base


class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String, unique=True)
    password = Column(String)
