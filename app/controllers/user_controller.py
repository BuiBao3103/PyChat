from flask import render_template, redirect, url_for, flash, request
from app.errors import InvalidAPIUsage
from app import db
from app.models import User


class UserController:
    @staticmethod
    def get_all_user():
        raise InvalidAPIUsage(message="lỗi", status_code=401)
        return db.session.query(User).first()
