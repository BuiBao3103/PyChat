import traceback

from flask import jsonify, request
from flask_login import login_user, logout_user
from server.app import app, db, bc
from server.app.models import User
from server.app.errors import InvalidAPIUsage
from sqlalchemy.exc import IntegrityError


class AuthController:
    @staticmethod
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()
        if not user or not bc.check_password_hash(user.password, password):
            raise InvalidAPIUsage(message='Invalid email or password', status_code=400)

        login_user(user)
        return jsonify({'status': 'success', 'data': user.to_dict()}), 200

    @staticmethod
    def register():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        last_name = data.get('lastName')
        first_name = data.get('firstName')
        username = f"{first_name} {last_name}"
        try:
            hashed_password = bc.generate_password_hash(password, 10)
            new_user = User(email=email, first_name=first_name,
                            last_name=last_name, password=hashed_password,
                            username=username)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
        except IntegrityError:
            db.session.rollback()
            raise InvalidAPIUsage(message='Email exist!', status_code=400)

        return jsonify({'status': 'success', 'data': new_user.to_dict()}), 200

    @staticmethod
    def logout():
        logout_user()
        return jsonify({
            'status': 'success'
        }), 200
