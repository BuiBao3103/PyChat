from flask import render_template, redirect, url_for, flash, request
from flask_login import current_user
from src import db
from src.models import Conversation, Participant, User


class ViewController:
    @staticmethod
    def index(room_id):
        user = db.session.query(User).get(1)
        conversation = Conversation.query.get(room_id)
        messages = conversation.messages
       
        return render_template('index.html', user=user, messages=messages)
