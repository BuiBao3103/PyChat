from flask import Blueprint
from src.controllers import Users, Me, UserConversations,MeConversations
from flask_restful import Api

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/users')
api = Api(user_bp)
api.add_resource(Users, '/', '/<int:user_id>')
api.add_resource(Me, '/me')
api.add_resource(UserConversations, '/<int:user_id>/conversations')
api.add_resource(MeConversations, '/me/conversations')