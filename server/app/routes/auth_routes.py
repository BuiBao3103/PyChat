from flask import Blueprint
from server.app import app
from server.app.controllers import Login, Register, Logout
from server.app.auth import protect
from flask_restful import Api

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/')
api = Api(auth_bp)
api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(Logout, '/logout')