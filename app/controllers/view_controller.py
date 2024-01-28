from flask import render_template, redirect, url_for, flash, request
from app import db
from app.models import User
from app.errors import InvalidAPIUsage

class ViewController:
    @staticmethod
    def login():
        return db.session.query(User).first()

