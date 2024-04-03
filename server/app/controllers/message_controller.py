from flask import jsonify, request
from flask_login import current_user
from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Message, MessageType
from datetime import datetime

from server.app.util.api_features import APIFeatures


class MessageController:
    @staticmethod
    def create():
        pass

    @staticmethod
    def get_all():
        args = request.args
        query = db.session.query(Message)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count,
             'data': [message.to_dict() for message in results]}), 200

    @staticmethod
    def get_all_on_conversation(conversation_id):
        args = request.args
        query = db.session.query(Message).filter(Message.conversation_id == conversation_id)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count,
             'data': [message.to_dict() for message in results]}), 200
