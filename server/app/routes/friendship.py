from server.app import app
from flask import request
from server.app.controllers import FriendshipController


@app.route('/api/v1/friendships', methods=['GET', 'POST'])
def friendships_api():
    match request.method:
        case 'GET':
            return FriendshipController.get_all()
        case 'POST':
            return FriendshipController.create()


@app.route('/api/v1/friendships/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def friendships_id_api(id):
    match request.method:
        case 'GET':
            return FriendshipController.get_one()
        case 'PATCH':
            return FriendshipController.update(id)
        case 'DELETE':
            return FriendshipController.delete(id)
