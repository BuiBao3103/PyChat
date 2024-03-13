from flask import jsonify, request
from app import db
from app.errors import InvalidAPIUsage
from app.models import Friendship
from sqlalchemy.exc import IntegrityError

class FriendshipController:
    @staticmethod
    def create():
        data = request.get_json()
        user_id = data.get('userID')
        friend_id = data.get('friendID')
        friend_ship = Friendship(user_id=user_id, friend_id=friend_id)
        try:
            db.session.add(friend_ship)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()  # Rollback the transaction to avoid partial commits
            raise InvalidAPIUsage(message='Error creating friendship', status_code=400)

        return jsonify({'status': 'success'}), 200