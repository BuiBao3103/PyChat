from flask import render_template, redirect, url_for, flash, request
from flask_login import current_user
from server.app import db
from server.app.models import Conversation, Participant, User


class ViewController:
    @staticmethod
    def index(room_id):
        return render_template('index.html')
