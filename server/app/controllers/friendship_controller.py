from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Friendship, FriendshipStatus, Conversation, ConversationType, Participant
from datetime import datetime
from server.app.util.api_features import APIFeatures
from server.app.errors import InvalidAPIUsage
from server.app import db
from flask_restful import Resource
from flask import request, make_response


class Friendships(Resource):
    def get(self, friendship_id=None):
        if friendship_id == None:
            api_freatures = APIFeatures(Friendship, request.args)
            items, total_count = api_freatures.perform_query()
            response = make_response(
                {'status': 'sucess', 'total_count': total_count, 'data': [item.to_dict() for item in items]}, 200)
            return response
        else:
            friendship = Friendship.query.get(friendship_id)
            if not friendship:
                raise InvalidAPIUsage(
                    message='Friendship does not exist!', status_code=400)
            response = make_response(
                {'status': 'sucess', 'data': friendship.to_dict()}, 200)
            return response

    def post():
        data = request.get_json()
        try:
            user_id = data["userID"]
            friend_id = data["friendID"]
            status = FriendshipStatus(data["status"])
            friendship = Friendship(
                user_id=user_id, friend_id=friend_id, status=status)
            db.session.add(friendship)
            db.session.commit()
        except KeyError as e:
            raise InvalidAPIUsage(
                message=f"Missing field '{e.args[0]}' in request",
                status_code=400
            ) from e
        except Exception as e:
            db.session.rollback()
            app.logger.exception("Error creating friendship")
            raise InvalidAPIUsage(
                message="Error creating friendship", status_code=400) from e
        response = make_response(
            {"status": "success", "data": friendship.to_dict()}, 201)
        return response

    # @staticmethod

    def patch(self, friendship_id):
        data = request.get_json()
        status_value = data.get('status')
        if status_value:
            data['status'] = FriendshipStatus(status_value)
        num_updated = Friendship.query.filter_by(id=friendship_id).update(data)
        if num_updated:
            db.session.commit()
            updated_friendship = Friendship.query.get(friendship_id)
            response = make_response(
                {'status': 'success', 'data': updated_friendship.to_dict()}, 200)
            return response
        else:
            raise InvalidAPIUsage(
                message='Friendship not found', status_code=404)

    def delete(self, friendship_id):
        friendship = Friendship.query.get(friendship_id)
        if not friendship:
            raise InvalidAPIUsage(
                message='Friendship not found', status_code=404)
        friendship.delete_at = datetime.now()
        db.session.commit()
        response = make_response({'status': 'success', 'data': None}, 204)
        return response

class FriendshipsRequest(Resource):
    def post(self):
        data = request.get_json()
        user_id = data["userID"]
        friend_id = data["friendID"]
        existing_friendship = Friendship.query.filter_by(
            user_id=user_id, friend_id=friend_id, delete_at=None).first()
        if existing_friendship is not None:
            raise InvalidAPIUsage(
                message="Friendships is exist!", status_code=400)
        friendship_user = Friendship(
            user_id=user_id, friend_id=friend_id, status=FriendshipStatus.REQUEST_SENT)
        friendship_friend = Friendship(
            user_id=friend_id, friend_id=user_id, status=FriendshipStatus.REQUEST_RECEIVED)
        try:
            db.session.add_all([friendship_user, friendship_friend])
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.exception("Error creating request friendship")
            raise InvalidAPIUsage(
                message="Error creating request friendship", status_code=400) from e
        response = make_response({"status": "success"}, 201)
        return response


class FriendshipsAccept(Resource):
    def post(self):
        data = request.get_json()
        user_id = data.get('userID')
        friend_id = data.get('friendID')
        friendship_user = Friendship.query.filter_by(
            user_id=user_id, friend_id=friend_id, delete_at=None).first()
        friendship_friend = Friendship.query.filter_by(
            user_id=friend_id, friend_id=user_id, delete_at=None).first()
        if not friendship_user or not friendship_friend:
            raise InvalidAPIUsage(
                message='Friendships is not exist!', status_code=400)
        if (friendship_user.status != FriendshipStatus.REQUEST_RECEIVED
                or friendship_friend.status != FriendshipStatus.REQUEST_SENT):
            raise InvalidAPIUsage(
                message='Friend is not request!', status_code=400)
        conversation = Conversation(type=ConversationType.PERSONAL)
        try:
            db.session.add(conversation)
            db.session.commit()
            db.session.refresh(conversation)

            friendship_user.status = FriendshipStatus.FRIENDS
            friendship_friend.status = FriendshipStatus.FRIENDS
            db.session.add_all([friendship_user, friendship_friend])

            participant_user = Participant(
                user_id=user_id, conversation_id=conversation.id)
            participant_friend = Participant(
                user_id=friend_id, conversation_id=conversation.id)
            db.session.add_all([participant_user, participant_friend])
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.error(f'Exception: {e}')
            raise InvalidAPIUsage(
                message='Error creating accept friendship', status_code=400)
        response = make_response({"status": "success"}, 200)
        return response
