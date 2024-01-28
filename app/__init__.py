import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config.from_object('app.config.Config')

db = SQLAlchemy(app)  # flask-sqlalchemy
bc = Bcrypt(app)  # flask-bcrypt

# lm = LoginManager()  # flask-loginmanager
# lm.init_app(app)  # init the login manager

# from app.routes import routes_bp
#
# app.register_blueprint(routes_bp)

