import os
import logging

# Flask modules
from flask import render_template, request, url_for, redirect, send_from_directory, flash
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.exceptions import HTTPException, NotFound, abort
from jinja2 import TemplateNotFound
from app.controllers.view_controller import ViewController
# App modules
from app import app, db, bc


@app.route('/')
def index():
    if not current_user.is_authenticated:
        return redirect(url_for('login_page'))
    return ViewController.index()


@app.route('/login')
def login_page():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    return ViewController.login()


@app.route('/register')
def register_page():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    return ViewController.register()


@app.route('/r/<int:channel_id>')
def room(channel_id):
    return ViewController.chat(channel_id)
