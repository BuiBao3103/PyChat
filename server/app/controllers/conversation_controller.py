from flask import jsonify, request
from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Conversation, ConversationType, Participant
from datetime import datetime

from server.app.util.api_features import APIFeatures


class ConversationController:

    @staticmethod
    def create():
        pass

    @staticmethod
    def get_all():
        args = request.args
        query = db.session.query(Conversation)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count,
             'data': [conversation.to_dict() for conversation in results]}), 200

    @staticmethod
    def get_all_on_user(user_id):
        args = request.args
        query = db.session.query(Conversation).join(Participant).filter(Participant.user_id == user_id)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count,
             'data': [conversation.to_dict() for conversation in results]}), 200
