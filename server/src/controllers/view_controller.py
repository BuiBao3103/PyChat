from flask import render_template, redirect, url_for, flash, request
from flask_login import current_user
from src import db
from src.models import Conversation, Participant, User, Message


class ViewController:
    @staticmethod
    def index(room_id, user_id):
        user = db.session.query(User).get(user_id)
        messages = db.session.query(Message).filter(Message.conversation_id == room_id).all()
        messages = [message.to_dict() for message in messages]
        return render_template('index.html', user=user, messages=messages)
