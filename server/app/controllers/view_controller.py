from flask import render_template, redirect, url_for, flash, request
from flask_login import current_user
from server.app import db
from server.app.models import Conversation, Participant, User


class ViewController:
    @staticmethod
    def index():
        sub_query = db.session.query(Conversation.id).join(Participant).filter(
            Participant.user_id == current_user.id).subquery()
        query = (db.session.query(User.username, Conversation.channel_id)
                 .join(Participant, User.id == Participant.user_id)
                 .join(Conversation, Participant.conversation_id == Conversation.id)
                 .filter(Participant.conversation_id.in_(sub_query))
                 .filter(User.id != current_user.id))
        channels = query.all()
        return render_template('index.html', channels=channels)

    @staticmethod
    def chat(channel_id):
        sub_query = db.session.query(Conversation.id).join(Participant).filter(
            Participant.user_id == current_user.id).subquery()
        query = (db.session.query(User.username, Conversation.channel_id)
                 .join(Participant, User.id == Participant.user_id)
                 .join(Conversation, Participant.conversation_id == Conversation.id)
                 .filter(Participant.conversation_id.in_(sub_query))
                 .filter(User.id != current_user.id))
        channels = query.all()

        messages = db.session.query(Conversation).filter(Conversation.channel_id == channel_id).first().messages

        return render_template('chat.html', channels=channels, messages=messages)

    @staticmethod
    def login():
        return render_template('accounts/login.html')

    @staticmethod
    def register():
        return render_template('accounts/register.html')
