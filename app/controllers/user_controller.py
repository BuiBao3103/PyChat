from flask import render_template, redirect, url_for, flash, request, jsonify
from app.errors import InvalidAPIUsage
from app import db
from app.models import User
from flask_login import login_user, logout_user, current_user


class UserController:
    @staticmethod
    def login():
        user = User.query.filter_by(id=1).first()
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
