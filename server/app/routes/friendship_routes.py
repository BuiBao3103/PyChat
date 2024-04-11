from server.app.controllers import Friendships, FriendshipsRequest, FriendshipsAccept
from flask import Blueprint
from flask_restful import Api

friendship_bp = Blueprint('friendship', __name__,
                          url_prefix='/api/v1/friendships')
api = Api(friendship_bp)
api.add_resource(Friendships, '/', '/<int:friendship_id>')
api.add_resource(FriendshipsRequest, '/request')
api.add_resource(FriendshipsAccept, '/accept')

# @app.route('/api/v1/friendships', methods=['GET', 'POST'])
# # @protect()
# def friendships_api():
#     match request.method:
#         case 'GET':
#             return FriendshipController.get_all()
#         case 'POST':
#             return FriendshipController.create()


# @app.route('/api/v1/friendships/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
# # @protect()
# def friendships_id_api(id):
#     match request.method:
#         case 'GET':
#             return FriendshipController.get_one(id)
#         case 'PATCH':
#             return FriendshipController.update(id)
#         case 'DELETE':
#             return FriendshipController.delete(id)


# @app.route('/api/v1/friendships/request', methods=['POST'])
# # @protect()
# def friendships_request_api():
#     return FriendshipController.request()


# @app.route('/api/v1/friendships/accept', methods=['POST'])
# # @protect()
# def friendships_accept_api():
#     return FriendshipController.accept()
