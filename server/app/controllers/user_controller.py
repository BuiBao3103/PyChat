from flask import render_template, redirect, url_for, flash, request, jsonify
from server.app import InvalidAPIUsage
from server.app import db
from server.app import User
from flask_login import login_user, logout_user, current_user


class UserController:
    pass
