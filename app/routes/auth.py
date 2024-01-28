from app import app, db, bc
from app.controllers import UserController


@app.route('/login')
def login():
    return UserController.login()

@app.route('/logout')
def logout():
    return UserController.logout()
