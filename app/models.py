from app import app, db
from flask_login import UserMixin
from sqlalchemy import Column, Integer, Float, String, ForeignKey, Enum, DateTime, Boolean
from sqlalchemy.orm import relationship

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
