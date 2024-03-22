from flask import jsonify, request
from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Friendship, User, FriendshipStatus
from sqlalchemy.exc import IntegrityError


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
        if 'status' in data:
            data['status'] = FriendshipStatus(data['status'])
        num_updated = Friendship.query.filter_by(id=id).update(data)

        if num_updated:
            db.session.commit()
            return jsonify({'status': 'success'}), 200
        else:
            raise InvalidAPIUsage(message='Friendship not found', status_code=404)


@staticmethod
def delete():
    data = request.get_json()
    friendship_id = data.get('friendshipID')
    friendship = Friendship.query.get(friendship_id)
    if friendship:
        db.session.delete(friendship)
        db.session.commit()
        return jsonify({'status': 'success'}), 200
    else:
        raise InvalidAPIUsage(message='Friendship not found', status_code=404)


@staticmethod
def get_one():
    data = request.get_json()
    friendship_id = data.get('friendshipID')
    friendship = Friendship.query.get(friendship_id)
    if friendship:
        return jsonify({'status': 'success', 'friendship': friendship.to_dict()}), 200
    else:
        raise InvalidAPIUsage(message='Friendship not found', status_code=404)


@staticmethod
def get_all():
    friendships = Friendship.query.all()
    return jsonify(
        {'status': 'success', 'friendships': [friendship.to_dict() for friendship in friendships]}), 200
