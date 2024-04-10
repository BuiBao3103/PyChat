import traceback
from flask_jwt_extended import create_access_token
from flask import request
from server.app import db, bc
from server.app.models import User
from server.app.errors import InvalidAPIUsage
from sqlalchemy.exc import IntegrityError
from flask import make_response
from flask_restful import Resource


class Login(Resource):

    def post(self):
        body = request.get_json()
        email = body['email']
        password = body['password']
        user = User.query.filter_by(email=email).first()
        if not user or not bc.check_password_hash(user.password, password):
            raise InvalidAPIUsage(
                message='Invalid email or password', status_code=400)

        access_token = create_access_token(identity=user.id)
        response = make_response(
            {'status': 'sucess', 'data': user.to_dict()}, 200)

        response.set_cookie('jwt', access_token, httponly=True)

        return response


class Register(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        last_name = data.get('lastName')
        first_name = data.get('firstName')
        username = f"{first_name} {last_name}"
        new_user = None
        try:
            hashed_password = bc.generate_password_hash(password, 10)
            new_user = User(email=email, first_name=first_name,
                            last_name=last_name, password=hashed_password,
                            username=username)
            db.session.add(new_user)
            db.session.commit()
            db.session.refresh(new_user)
        except IntegrityError:
            print(traceback.format_exc())
            db.session.rollback()
            raise InvalidAPIUsage(message='Email exist!', status_code=400)
        access_token = create_access_token(identity=new_user.id)
        response = make_response(
            {'status': 'sucess', 'data': new_user.to_dict()}, 200)

        response.set_cookie('jwt', access_token, httponly=True)

        return response


class Logout(Resource):
    def post(self):
        response = make_response(
            {'status': 'sucess'}, 200)
        response.set_cookie('jwt', '', httponly=True, max_age=10)

        return response
