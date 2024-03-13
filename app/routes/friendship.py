from app import app
from app.controllers import FriendshipController


@app.route('/api/friendships', methods=['POST'])
def login_api():
    return FriendshipController.create()
