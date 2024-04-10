from flask import Blueprint
from server.app import app
from server.app.controllers import Login
from server.app.auth import protect
from flask_restful import Api

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/')
api = Api(auth_bp)
# api.add_resource(Login, '/login', '/register', '/logout')
api.add_resource(Login, '/login')