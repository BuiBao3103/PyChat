import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_bcrypt import Bcrypt
from flask_babel import Babel
from flask_socketio import SocketIO
# Grabs the folder where the script runs.

app = Flask(__name__)
app.config.from_object('app.config.Config')
socketio = SocketIO(app)
db = SQLAlchemy(app)  # flask-sqlalchemy
bc = Bcrypt(app)  # flask-bcrypt

lm = LoginManager()  # flask-loginmanager
lm.init_app(app)  # init the login manager

from app.models import User


@lm.user_loader
def load_user(user_id):
    return User.query.get(user_id)


def get_locale():
    if current_user.is_authenticated:
        return current_user.locale
    return 'vi'


babel = Babel(app, locale_selector=get_locale)
