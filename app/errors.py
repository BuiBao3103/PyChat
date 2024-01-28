from flask import jsonify, render_template
from app import app


class InvalidAPIUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidAPIUsage)
def invalid_api_usage(e):
    return jsonify(e.to_dict()), e.status_code


@app.errorhandler(404)
def handle_internal_server_error(e):
    return render_template("page-404.html"), 404


@app.errorhandler(500)
def handle_internal_server_error(e):
    return render_template("page-500.html"), 500
