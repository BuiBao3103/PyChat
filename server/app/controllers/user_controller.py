from flask import render_template, redirect, url_for, flash, request, jsonify
from server.app.errors import InvalidAPIUsage
from server.app import db
from server.app.models import User
from flask_login import login_user, logout_user, current_user


class UserController:
    @staticmethod
    def get_me():
        return jsonify({'status': 'success', 'data': current_user.to_dict()}), 200
