from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_babel import Babel
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_jwt_extended import JWTManager
# Initialize Flask app
app = Flask(__name__)
app.config.from_object('src.config.Config')

# Initialize Flask extensions
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
jwt = JWTManager(app)
socketio = SocketIO(app)
db = SQLAlchemy(app)
bc = Bcrypt(app)
lm = LoginManager()
lm.init_app(app)

# Define before request handler
# @app.before_request
# def before_request():
#     session.permanent = True
#     app.permanent_session_lifetime = timedelta(minutes=5)


# Initialize Flask-Restful Api

# Add RESTful resource to the API
