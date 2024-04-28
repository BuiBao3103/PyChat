from flask import session
from src import socketio, db
from flask_socketio import join_room, leave_room, send, emit
from src.models import Message, Conversation, MessageType, User, Attachment
from flask import request
from datetime import datetime
import base64
from io import BytesIO
from PIL import Image
from cloudinary import uploader

user_session = {}


@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('userID')
    if user_id is None:
        return
    session['user_id'] = user_id  # Store user_id in session
    user = User.query.get(user_id)
    user.last_online = None
    db.session.commit()
    session_id = request.sid
    user_session[user_id] = session_id
    print(user_session)
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    user_id = session.get('user_id')  # Retrieve user_id from session
    if user_id:
        user = User.query.get(user_id)
        user.last_online = datetime.now()
        db.session.commit()
        del user_session[str(user_id)]
    print('Client disconnected')


@socketio.on('join')
def handle_join(data):
    channel_id = data['channel_id']
    join_room(channel_id)
    print(f'Joined room {channel_id}')


@socketio.on('leave')
def handle_leave(data):
    channel_id = data['channel_id']
    leave_room(channel_id)
    print(f'Left room {channel_id}')


@socketio.on('message')
def handle_message(data):
    message_type = MessageType(data['type'])
    print(message_type)
    if message_type == MessageType.TEXT:
        handle_text_message(data)
    elif message_type == MessageType.IMAGE:
        handle_image_message(data)


def handle_text_message(data):
    channel_id = data['channel_id']
    user_id = data['user_id']
    time = float(data['time'])/1000
    message_type = MessageType(data['type'])
    conversation = Conversation.query.get(channel_id)
    message = data['message']
    new_message = Message(user_id=user_id, message=message,
                          conversation_id=conversation.id, time=datetime.fromtimestamp(
                              time),
                          type=message_type)
    db.session.add(new_message)
    db.session.commit()
    db.session.refresh(new_message)
    conversation.last_message_id = new_message.id
    db.session.commit()
    # Broadcast the message to everyone in the room except the sender
    emit('message', new_message.to_dict(), room=channel_id)
    participants = conversation.participants
    for participant in participants:
        if user_session.get(str(participant.id)) is not None:
            emit('new_mess', {'conversation': conversation.to_dict()},
                 room=user_session[str(participant.id)])


def handle_image_message(data):
    channel_id = data['channel_id']
    user_id = data['user_id']
    time = float(data['time'])/1000
    message_type = MessageType(data['type'])
    conversation = Conversation.query.get(channel_id)
    image_data = data['imageData']
    file_extension = data['fileExtension'].lower()
    image_bytes = base64.b64decode(image_data)
    img = Image.open(BytesIO(image_bytes))
    image_name = f'received_image.{file_extension}'
    # img.save(image_name)
    image_stream = BytesIO()
    file_extension = 'JPEG' if file_extension.lower() == 'jpg' else file_extension.upper()
    img.save(image_stream, format=file_extension)
    image_stream.seek(0)  # Reset the stream position to the beginning
    upload_result = uploader.upload(
        image_stream, folder="message_image", resource_type="image")
    print(upload_result)
    new_message = Message(user_id=user_id, conversation_id=channel_id,
                          time=datetime.fromtimestamp(time),
                          type=message_type)
    db.session.add(new_message)
    db.session.commit()
    db.session.refresh(new_message)
    attachment = Attachment(
        message_id=new_message.id, url=upload_result['url'])
    db.session.add(attachment)
    conversation.last_message_id = new_message.id
    db.session.commit()
    emit('message', new_message.to_dict(), room=channel_id)
