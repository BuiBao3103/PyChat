from flask import Blueprint
from src.controllers import ConversationMessages, Conversations, ConversationImages
from flask_restful import Api

conversation_dp = Blueprint(
    'conversation', __name__, url_prefix='/api/v1/conversations')
api = Api(conversation_dp)
api.add_resource(Conversations, '/', '/<int:conversation_id>')
api.add_resource(ConversationMessages, '/<int:conversation_id>/messages')
api.add_resource(ConversationImages, '/<int:conversation_id>/images')
# @app.route('/api/v1/conversations', methods=['GET', 'POST'])
# # @protect()
# def conversations_api():
#     match request.method:
#         case 'GET':
#             return ConversationController.get_all()
#         case 'POST':
#             return ConversationController.create()

# api.add_resource(Conversations, '/', '/<int:user_id>')

# @app.route('/api/v1/users/<int:user_id>/conversations', methods=['GET'])
# # @protect()
# def conversation_on_user_api(user_id):
#     return ConversationController.get_all_on_user(user_id)
