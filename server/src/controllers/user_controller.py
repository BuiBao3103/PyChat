from flask import request
from src.errors import InvalidAPIUsage
from src import db
from src.models import User
from src.auth import protect
from src.util.api_features import APIFeatures

from flask_restful import Resource
from flask import jsonify, request, make_response


class Users(Resource):
    @protect()
    def get(self, user_id=None):
        if user_id == None:
            api_freatures = APIFeatures(User, request.args)
            items, total_count = api_freatures.perform_query()
            response = make_response(
                {'status': 'sucess', 'total_count': total_count, 'data': [item.to_dict() for item in items]}, 200)
            return response
        else:
            user = User.query.get(user_id)
            if not user:
                raise InvalidAPIUsage(
                    message='User does not exist!', status_code=400)
            response = make_response(
                {'status': 'sucess', 'data': user.to_dict()}, 200)
            return response
    def patch(self, user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        if not user:
            raise InvalidAPIUsage(
                message='User does not exist!', status_code=400)
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        response = make_response(
            {'status': 'sucess', 'data': user.to_dict()}, 200)
        return response
    
class Me(Resource):
    @protect()
    def get(self):
        response = make_response(
            {'status': 'sucess', 'data': request.user.to_dict()}, 200)
        return response
