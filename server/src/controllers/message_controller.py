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

class ConversationImages(Resource):
    def get(self, conversation_id):
        conversation = Conversation.query.get(conversation_id)
        if not conversation:
            raise InvalidAPIUsage(
                message='Conversation not found', status_code=404)
        query = db.session.query(Message).filter(
            Message.conversation_id == conversation_id, Message.type == MessageType.IMAGE)
        api_freatures = APIFeatures(Message, request.args)
        items, total_count = api_freatures.perform_query(query)
        items = [item.to_dict() for item in items]
        images = []
        for item in items:
            for attachment in item['attachments']:
                images.append(attachment['url'])
        response = make_response(
            {'status': 'sucess', 'total_count': total_count, 'data': images}, 200)
        return response
#     