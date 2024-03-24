from flask import jsonify, request
from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Friendship, User, FriendshipStatus, Conversation, ConversationType, Participant
from datetime import datetime

from server.app.util.api_features import APIFeatures


class FriendshipController:
    @staticmethod
    def create():
        data = request.get_json()
        user_id = data.get('userID')
        friend_id = data.get('friendID')
        status = FriendshipStatus(data.get('status'))
        friendship = Friendship(user_id=user_id, friend_id=friend_id, status=status)
        try:
            db.session.add(friendship)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.error(f'Exception: {e}')
            raise InvalidAPIUsage(message='Error creating friendship', status_code=400)
        return jsonify({'status': 'success', 'data': friendship.to_dict()}), 201

    @staticmethod
    def update(id):
        data = request.get_json()
        status_value = data.get('status')
        if status_value:
            try:
                data['status'] = FriendshipStatus(status_value)
            except ValueError:
                raise InvalidAPIUsage(message='Invalid status value', status_code=400)

        num_updated = Friendship.query.filter_by(id=id).update(data)

        if num_updated:
            db.session.commit()
            updated_friendship = Friendship.query.get(id)
            return jsonify({'status': 'success', 'data': updated_friendship.to_dict()}), 200
        else:
            raise InvalidAPIUsage(message='Friendship not found', status_code=404)

    @staticmethod
    def delete(id):
        num_deleted = Friendship.query.filter_by(id=id).update({'delete_at': datetime.now()})
        if num_deleted:
            db.session.commit()
            return jsonify({'status': 'success', 'data': None}), 204
        else:
            raise InvalidAPIUsage(message='Friendship not found', status_code=404)

    @staticmethod
    def get_one(id):
        friendship = Friendship.query.get(id)
        if friendship:
            return jsonify({'status': 'success', 'friendship': friendship.to_dict()}), 200
        else:
            raise InvalidAPIUsage(message='Friendship not found', status_code=404)

    @staticmethod
    def get_all():
        args = request.args
        query = db.session.query(User)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count,
             'friendships': [friendship.to_dict() for friendship in results]}), 200

    @staticmethod
    def request():
        data = request.get_json()
        user_id = data.get('userID')
        friend_id = data.get('friendID')
        friendships = (Friendship.query.filter_by(user_id=user_id, friend_id=friend_id)
                       .filter(Friendship.delete_at is not None).all())
        if friendships:
            raise InvalidAPIUsage(message='Friendships is exist!', status_code=400)
        friendship_user = Friendship(user_id=user_id, friend_id=friend_id,
                                     status=FriendshipStatus.REQUEST_SENT)
        friendship_friend = Friendship(user_id=friend_id, friend_id=user_id,
                                       status=FriendshipStatus.REQUEST_RECEIVED)
        try:
            db.session.add(friendship_user)
            db.session.add(friendship_friend)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.error(f'Exception: {e}')
            raise InvalidAPIUsage(message='Error creating request friendship', status_code=400)
        return jsonify(
            {'status': 'success'}), 200

    @staticmethod
    def accept():
        data = request.get_json()
        user_id = data.get('userID')
        friend_id = data.get('friendID')
        friendship_user = (Friendship.query.filter_by(user_id=user_id, friend_id=friend_id)
                           .filter(Friendship.delete_at is not None).first())
        friendship_friend = (Friendship.query.filter_by(user_id=friend_id, friend_id=user_id)
                             .filter(Friendship.delete_at is not None).first())
        if not friendship_friend or not friendship_user:
            raise InvalidAPIUsage(message='Friendships is not exist!', status_code=400)
        if (friendship_user.status != FriendshipStatus.REQUEST_RECEIVED
                and friendship_friend.status != FriendshipStatus.REQUEST_SENT):
            raise InvalidAPIUsage(message='Friend is not request!', status_code=400)
        friendship_user.status = FriendshipStatus.FRIENDS
        friendship_friend.status = FriendshipStatus.FRIENDS
        conversation = Conversation(type=ConversationType.PERSONAL)
        try:
            db.session.add(friendship_user)
            db.session.add(friendship_friend)
            db.session.add(conversation)
            db.session.commit()
            db.session.refresh(conversation)
            participant_user = Participant(user_id=user_id, conversation_id=conversation.id)
            participant_friend = Participant(user_id=friend_id, conversation_id=conversation.id)
            db.session.add(participant_user)
            db.session.add(participant_friend)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            app.logger.error(f'Exception: {e}')
            raise InvalidAPIUsage(message='Error creating accept friendship', status_code=400)
        return jsonify(
            {'status': 'success', }), 200
