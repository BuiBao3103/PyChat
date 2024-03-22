from flask import jsonify, request
from server.app import db, app
from server.app.errors import InvalidAPIUsage
from server.app.models import Friendship, User, FriendshipStatus
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
        query = db.session.query(Friendship)
        api_features = APIFeatures(query, args)
        api_features.filter().sort().limit_fields().paginate()
        results = api_features.query.all()
        print(results)
        return jsonify(
            {'status': 'success', 'friendships': [friendship.to_dict() for friendship in results]}), 200
