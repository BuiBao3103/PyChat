from server.app import app
from server.app import FriendshipController


@app.route('/api/friendships', methods=['POST'])
def login_api():
    return FriendshipController.create()
