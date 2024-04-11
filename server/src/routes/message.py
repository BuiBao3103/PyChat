from src import app
from flask import request
from src.controllers import MessageController
from src.auth import protect


@app.route('/api/v1/messages', methods=['GET', 'POST'])
# @protect()
def messages_api():
    match request.method:
        case 'GET':
            return MessageController.get_all()
        case 'POST':
            return MessageController    .create()


@app.route('/api/v1/conversations/<int:conversation_id>/messages', methods=['GET'])
# @protect()
def messages_on_conversation_api(conversation_id):
    return MessageController.get_all_on_conversation(conversation_id)
