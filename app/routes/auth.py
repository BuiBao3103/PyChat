from app import app, lm, db, bc
from app.controllers import UserController

@app.route('/login')
def login():
    return f"{UserController.get_all_user().id}"
