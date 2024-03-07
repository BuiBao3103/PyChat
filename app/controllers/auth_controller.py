from flask import jsonify, request
from flask_login import login_user, logout_user, current_user
from app.models import User
from app.errors import InvalidAPIUsage


class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        print(data)
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            raise InvalidAPIUsage(message='Email and password are required', status_code=400)

        user = User.query.filter_by(email=email).first()

        if not user or password != user.password:
            raise InvalidAPIUsage(message='Invalid email or password', status_code=401)

        login_user(user)
        return jsonify({'status': 'success'}), 200

    @staticmethod
    def logout():
        logout_user()
        return jsonify({
            'status': 'success'
        }), 200
