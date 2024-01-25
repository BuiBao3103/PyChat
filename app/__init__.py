import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config.from_object('app.config.Config')

db = SQLAlchemy(app)  # flask-sqlalchemy
bc = Bcrypt(app)  # flask-bcrypt

lm = LoginManager()  # flask-loginmanager
lm.init_app(app)  # init the login manager

# Import routing and Start the App
from app import views

if __name__ == "run":
    with app.app_context():
        db.create_all()

