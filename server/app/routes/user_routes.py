from flask import Blueprint
from server.app.controllers import Users, Me
from flask_restful import Api

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/users')
api = Api(user_bp)
api.add_resource(Users, '/', '/<int:user_id>')
api.add_resource(Me, '/me')
