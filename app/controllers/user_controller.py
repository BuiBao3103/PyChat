from flask import render_template, redirect, url_for, flash, request
from app import db
from app.models import User

class UserController:
    @staticmethod
    def get_all_user():
        return db.session.query(User).first()

