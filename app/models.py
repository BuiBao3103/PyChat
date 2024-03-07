from app import app, db
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True)
    username = Column(String(80))
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), unique=True, nullable=False)
    participants = relationship("Participant", backref="user", lazy=True)


class Conservation(db.Model):
    id = Column(Integer, primary_key=True)
    channel_id = Column(Integer, unique=True, nullable=False)
    participants = relationship("Participant", backref="conservation")


class Participant(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    conservation_id = Column(Integer, ForeignKey('conservation.id'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
