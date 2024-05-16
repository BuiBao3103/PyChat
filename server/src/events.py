from flask import session
from src import socketio, db
from flask_socketio import join_room, leave_room, send, emit, rooms
from src.models import Message, Conversation, MessageType, User, Attachment
from flask import request
from datetime import datetime
import base64
from io import BytesIO
from PIL import Image
from cloudinary import uploader

# Dictionary to store user session IDs
user_session = {}


@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('userID')
    if user_id:
        session['user_id'] = user_id
        user = User.query.get(user_id)
        if user:
            user.last_online = None
            db.session.commit()
        session_id = request.sid
        user_session[user_id] = session_id


@socketio.on('disconnect')
def handle_disconnect():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            user.last_online = datetime.now()
            db.session.commit()
            user_session.pop(str(user_id), None)


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
    message = None
    if message_type == MessageType.TEXT:
        message = handle_text_message(data)
    elif message_type == MessageType.IMAGE:
        message = handle_image_message(data)

    emit('message', message.to_dict(), room=data['channel_id'])

    # conversation = Conversation.query.get(data['channel_id'])
    # participants = conversation.participants

    # users_in_room = rooms()[data['channel_id']]

    # # Compare users in the room with users from the database
    # for participant in participants:
    #     if str(participant.user.id) not in users_in_room:
    #         # User is not in the room, emit a notification
    #         emit('new_message', {'user_id': participant.user.id},
    #              room=user_session.get(str(participant.user.id)))


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
    return new_message


def handle_image_message(data):
    channel_id = data['channel_id']
    user_id = data['user_id']
    time = float(data['time'])/1000
    message_type = MessageType(data['type'])
    conversation = Conversation.query.get(channel_id)
    new_message = Message(user_id=user_id, conversation_id=channel_id,
                          time=datetime.fromtimestamp(time),
                          type=message_type)
    conversation.last_message_id = new_message.id
    db.session.add(new_message)
    db.session.commit()
    db.session.refresh(new_message)
    conversation.last_message_id = new_message.id
    db.session.commit()
    image_datas = data['imageDatas']
    for image_data in image_datas:
        file_extension = image_data['fileExtension']
        image_bytes = base64.b64decode(image_data['image'])
        img = Image.open(BytesIO(image_bytes))
        image_stream = BytesIO()
        file_extension = 'JPEG' if file_extension.lower() == 'jpg' else file_extension.upper()
        img.save(image_stream, format=file_extension)
        image_stream.seek(0)  # Reset the stream position to the beginning
        upload_result = uploader.upload(
            image_stream, folder="message_image", resource_type="image")
        attachment = Attachment(
            message_id=new_message.id, url=upload_result['url'])
        db.session.add(attachment)
    db.session.commit()
    return new_message
