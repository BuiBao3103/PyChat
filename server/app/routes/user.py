from server.app import app
from server.app.controllers.auth_controller import AuthController


@app.route('/api/v1/users/login', methods=['POST'])
def login_api():
    return AuthController.login()


@app.route('/api/v1/users/logout', methods=['POST'])
def logout_api():
    return AuthController.logout()


@app.route('/api/v1/users/register', methods=['POST'])
def register_api():
    return AuthController.register()
