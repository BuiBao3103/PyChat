from flask import Blueprint
from server.app import app
from server.app.controllers import User
from server.app.auth import protect
from flask_restful import Api

user_bp = Blueprint('user', __name__, url_prefix='/api/v1/users')
api = Api(user_bp)
# api.add_resource(Login, '/login', '/register', '/logout')
api.add_resource(User, '/','/<int:user_id>')
# @app.route('/api/v1/users/login', methods=['POST'])
# def login_api():
#     return AuthController.login()


# @app.route('/api/v1/users/logout', methods=['POST'])
# def logout_api():
#     return AuthController.logout()

# ``
# @app.route('/api/v1/users/register', methods=['POST'])
# def register_api():
#     return AuthController.register()


# @app.route('/api/v1/users', methods=['GET'])
# def users_api():
#     return UserController.get_all()


# @app.route('/api/v1/users/me', methods=['GET'])
# # @protect()
# def get_me_api():
#     return UserController.get_me()
