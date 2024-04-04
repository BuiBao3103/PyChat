from server.app import app
from flask import request
from server.app.controllers import FriendshipController
from server.app.auth import protect


@app.route('/api/v1/friendships', methods=['GET', 'POST'])
# @protect()
def friendships_api():
    match request.method:
        case 'GET':
            return FriendshipController.get_all()
        case 'POST':
            return FriendshipController.create()


@app.route('/api/v1/friendships/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
# @protect()
def friendships_id_api(id):
    match request.method:
        case 'GET':
            return FriendshipController.get_one(id)
        case 'PATCH':
            return FriendshipController.update(id)
        case 'DELETE':
            return FriendshipController.delete(id)


@app.route('/api/v1/friendships/request', methods=['POST'])
# @protect()
def friendships_request_api():
    return FriendshipController.request()


@app.route('/api/v1/friendships/accept', methods=['POST'])
# @protect()
def friendships_accept_api():
    return FriendshipController.accept()
