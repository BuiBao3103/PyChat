from app import app, db
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(80))
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), unique=True, nullable=False)
    participants = relationship("Participant", backref="user", lazy=True)
    messages = relationship("Message", backref="user", lazy=True)


class Conversation(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    channel_id = Column(Integer, unique=True, nullable=False)
    participants = relationship("Participant", backref="conversation", lazy=True)
    messages = relationship("Message", backref="conversation", lazy=True)


class Participant(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    conversation_id = Column(Integer, ForeignKey('conversation.id'))


class Message(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String(255), nullable=False)
    conversation_id = Column(Integer, ForeignKey('conversation.id'))
    user_id = Column(Integer, ForeignKey('user.id'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
