from server.app import app
from flask import request
from server.app.controllers import ConversationController
from server.app.auth import protect


@app.route('/api/v1/conversations', methods=['GET', 'POST'])
# @protect()
def conversations_api():
    match request.method:
        case 'GET':
            return ConversationController.get_all()
        case 'POST':
            return ConversationController.create()


@app.route('/api/v1/users/<int:user_id>/conversations', methods=['GET'])
# @protect()
def conversation_on_user_api(user_id):
    return ConversationController.get_all_on_user(user_id)
