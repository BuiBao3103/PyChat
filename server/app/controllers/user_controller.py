from flask import render_template, redirect, url_for, flash, request, jsonify
from server.app.errors import InvalidAPIUsage
from server.app import db
from server.app.models import User
from flask_login import login_user, logout_user, current_user

from server.app.util.api_features import APIFeatures


class UserController:
    @staticmethod
    def get_all():
        args = request.args
        query = db.session.query(User)
        api_features = APIFeatures(query, args)
        results, total_count = api_features.filter().sort().limit_fields().paginate()
        return jsonify(
            {'status': 'success', 'total_count': total_count, 'data': [user.to_dict() for user in results]}), 200

    @staticmethod
    def get_me():
        return jsonify({'status': 'success', 'data': current_user.to_dict()}), 200
