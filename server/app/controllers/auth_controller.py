import traceback
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import jsonify, request
from flask_login import login_user, logout_user
from server.app import app, db, bc
from server.app.models import User
from server.app.errors import InvalidAPIUsage
from sqlalchemy.exc import IntegrityError
from flask import make_response
# controllers/auth_controller.py

from flask_restful import Resource


class Login(Resource):
    def post(self):
        access_token = create_access_token(identity='1')
        user = User.query.get(1)
        # Create response object
        response = make_response(
            {'status': 'sucess', 'data': user.to_dict()}, 200)

        # Set access token in cookie
        response.set_cookie('jwt', access_token, httponly=True)

        return response


class Register(Resource):
    def post(self):
        # Register logic
        pass


class Logout(Resource):
    def post(self):
        # Logout logic
        pass


# class AuthController(Re):
#     @staticmethod
#     def login():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')
#         user = User.query.filter_by(email=email).first()
#         if not user or not bc.check_password_hash(user.password, password):
#             raise InvalidAPIUsage(message='Invalid email or password', status_code=400)

#         login_user(user)
#         return jsonify({'status': 'success', 'data': user.to_dict()}), 200

#     @staticmethod
#     def register():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')
#         last_name = data.get('lastName')
#         first_name = data.get('firstName')
#         username = f"{first_name} {last_name}"
#         try:
#             hashed_password = bc.generate_password_hash(password, 10)
#             new_user = User(email=email, first_name=first_name,
#                             last_name=last_name, password=hashed_password,
#                             username=username)
#             db.session.add(new_user)
#             db.session.commit()
#             login_user(new_user)
#         except IntegrityError:
#             db.session.rollback()
#             raise InvalidAPIUsage(message='Email exist!', status_code=400)

#         return jsonify({'status': 'success', 'data': new_user.to_dict()}), 200

#     @staticmethod
#     def logout():
#         logout_user()
#         return jsonify({
#             'status': 'success'
#         }), 200
