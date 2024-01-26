from app import app, db
from flask_login import UserMixin
from sqlalchemy import Column, Integer, Float, String, ForeignKey, Enum, DateTime, Boolean
from sqlalchemy.orm import relationship


class User(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    gender = Column(Boolean, nullable=False)
