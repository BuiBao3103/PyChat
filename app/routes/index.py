import os
import logging

# Flask modules
from flask import render_template, request, url_for, redirect, send_from_directory
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.exceptions import HTTPException, NotFound, abort
from jinja2 import TemplateNotFound
from app.controllers.view_controller import ViewController
# App modules
from app import app, db, bc


@app.route('/')
def index():
    return ViewController.index()


@app.route('/login')
def login():
    return ViewController.login()


@app.route('/register')
def register():
    return ViewController.register()
