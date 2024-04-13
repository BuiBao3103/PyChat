from src.errors import InvalidAPIUsage
from src.models import Conversation, Participant, ConversationType
from src.util.api_features import APIFeatures
from src import db
from flask_restful import Resource
from flask import request, make_response
from src.auth import protect

class Conversations(Resource):
    def get(self, conversation_id=None):
        if conversation_id == None:
            api_freatures = APIFeatures(Conversation, request.args)
            items, total_count = api_freatures.perform_query()
            response = make_response(
                {'status': 'sucess', 'total_count': total_count, 'data': [item.to_dict() for item in items]}, 200)
            return response
        else:
            conversation = Conversation.query.get(conversation_id)
            if not conversation:
                raise InvalidAPIUsage(
                message='Conversation does not exist!', status_code=400)
            response = make_response(
                {'status': 'sucess', 'data': conversation.to_dict()}, 200)
            return response

#     # @staticmethod
#     # def create():
#     #     pass

#     # @staticmethod
#     # def get_all():
#     #     args = request.args
#     #     query = db.session.query(Conversation)
#     #     api_features = APIFeatures(query, args)
#     #     results, total_count = api_features.filter().sort().limit_fields().paginate()
#     #     return jsonify(
#     #         {'status': 'success', 'total_count': total_count,
#     #          'data': [conversation.to_dict() for conversation in results]}), 200

#     # @staticmethod
#     # def get_all_on_user(user_id):
#     #     args = request.args
#     #     query = db.session.query(Conversation).join(Participant).filter(Participant.user_id == user_id)
#     #     api_features = APIFeatures(query, args)
#     #     results, total_count = api_features.filter().sort().limit_fields().paginate()
#     #     conversations = [conversation.to_dict() for conversation in results]
#     #     # print()
#     #     for conversation in conversations:
#     #         if ConversationType(conversations[0]['type']) == ConversationType.PERSONAL:
#     #             friend_user_index = 0
#     #             if conversation['participants'][0]['user']['id'] == current_user.id:
#     #                 friend_user_index = 1
#     #             conversation['friend'] = conversation['participants'][friend_user_index]['user']
#     #             del conversation['participants']
#     #     return jsonify(
#     #         {'status': 'success', 'total_count': total_count,
#     #          'data': conversations}), 200
#     pass


class UserConversations(Resource):
    @protect()
    def get(self, user_id):
        query = db.session.query(Conversation).join(
            Participant).filter(Participant.user_id == user_id)
        api_freatures = APIFeatures(Conversation, request.args)
        items, total_count = api_freatures.perform_query(query)
        items = [item.to_dict() for item in items]
        for conversation in items:
            if ConversationType(items[0]['type']) == ConversationType.PERSONAL:
                friend_user_index = 0
                if conversation['participants'][0]['user']['id'] == request.user.id:
                    friend_user_index = 1
                conversation['friend'] = conversation['participants'][friend_user_index]['user']
                del conversation['participants']
        response = make_response(
            {'status': 'sucess', 'total_count': total_count, 'data': items}, 200)
        return response

class MeConversations(Resource):
    @protect()
    def get(self):
        user = request.user
        query = db.session.query(Conversation).join(
            Participant).filter(Participant.user_id == user.id)
        api_freatures = APIFeatures(Conversation, request.args)
        items, total_count = api_freatures.perform_query(query)
        items = [item.to_dict() for item in items]
        for conversation in items:
            if ConversationType(items[0]['type']) == ConversationType.PERSONAL:
                friend_user_index = 0
                if conversation['participants'][0]['user']['id'] == request.user.id:
                    friend_user_index = 1
                conversation['friend'] = conversation['participants'][friend_user_index]['user']
                del conversation['participants']
        response = make_response(
            {'status': 'sucess', 'total_count': total_count, 'data': items}, 200)
        return response