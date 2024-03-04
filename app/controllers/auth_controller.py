from flask import jsonify
from flask_login import login_user, logout_user, current_user
from app.models import User
from app.errors import InvalidAPIUsage


class AuthController:
    @staticmethod
    def login():
        user = User.query.filter_by(id=1).first()
        raise InvalidAPIUsage(message='sai tên đăng nhập')
        login_user(user)
        return jsonify({
            'status': 'success'
        }), 200

    @staticmethod
    def logout():
        logout_user()
        return jsonify({
            'status': 'success'
        }), 200
