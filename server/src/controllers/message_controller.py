from flask import jsonify, request
from src import db, app
from src.errors import InvalidAPIUsage
from src.models import Message, MessageType, Conversation
from datetime import datetime
from flask import request, make_response
from src.util.api_features import APIFeatures

from flask_restful import Resource


class ConversationMessages(Resource):
    def get(self, conversation_id):
        conversation= Conversation.query.get(conversation_id)
        if not conversation:
            raise InvalidAPIUsage(
                message='Conversation not found', status_code=404)
        query = db.session.query(Message).filter(
            Message.conversation_id == conversation_id)
        api_freatures = APIFeatures(Message, request.args)
        items, total_count = api_freatures.perform_query(query)

        response = make_response(
            {'status': 'sucess', 'total_count': total_count, 'data': [item.to_dict() for item in items]}, 200)
        return response
#     @staticmethod
#     def create():
#         pass

#     @staticmethod
#     def get_all():
#         args = request.args
#         query = db.session.query(Message)
#         api_features = APIFeatures(query, args)
#         results, total_count = api_features.filter().sort().limit_fields().paginate()
#         return jsonify(
#             {'status': 'success', 'total_count': total_count,
#              'data': [message.to_dict() for message in results]}), 200

#     @staticmethod
#     def get_all_on_conversation(conversation_id):
#         args = request.args
#         query = db.session.query(Message).filter(Message.conversation_id == conversation_id)
#         api_features = APIFeatures(query, args)
#         results, total_count = api_features.filter().sort().limit_fields().paginate()
#         return jsonify(
#             {'status': 'success', 'total_count': total_count,
#              'data': [message.to_dict() for message in results]}), 200
