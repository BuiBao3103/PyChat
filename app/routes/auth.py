from app import app, db, bc
from app.controllers import AuthController


@app.route('/api/login', methods=['POST'])
def login_api():
    return AuthController.login()


@app.route('/api/logout', methods=['POST'])
def logout_api():
    return AuthController.logout()
