from flask import jsonify, request
from flask_login import login_user, logout_user, current_user
from app import db, bc
from app.models import User
from app.errors import InvalidAPIUsage


class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        email = data.gQet('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if not user or not bc.check_password_hash(user.password, password):
            raise InvalidAPIUsage(message='Invalid email or password', status_code=401)

        login_user(user)
        return jsonify({'status': 'success'}), 200

    @staticmethod
    def register():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')
        hashed_password = bc.generate_password_hash(password, 10)
        new_user = User(email=email, password=hashed_password, username=username)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return jsonify({'status': 'success'}), 200

    @staticmethod
    def logout():
        logout_user()
        return jsonify({
            'status': 'success'
        }), 200
