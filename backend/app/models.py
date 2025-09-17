# from sqlalchemy import Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# from app.database import Base

# Base = declarative_base()

# class Employee(Base):
#     __tablename__ = "employees"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True, nullable=False)
#     email = Column(String, unique=True, index=True, nullable=False)
#     role = Column(String, nullable=False)
#     department = Column(String, nullable=True)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    position = Column(String, nullable=True)

