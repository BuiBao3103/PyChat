from flask import render_template, redirect, url_for, flash, request
from app import db
from app.models import User


class ViewController:
    @staticmethod
    def index():
        return render_template('index.html')

    @staticmethod
    def login():
        return render_template('accounts/login.html')

    @staticmethod
    def register():
        return render_template('accounts/register.html')
