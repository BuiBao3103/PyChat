

from flask import Blueprint
from flask import render_template, request, url_for, redirect, flash
from jinja2 import TemplateNotFound
from server.app.controllers.view_controller import ViewController
from server.app import app, db, bc
view_dp = Blueprint('view', __name__, url_prefix='/')


@app.route('/<room_id>')
def index(room_id):
    return ViewController.index(room_id)
