from server.app import socketio, db
from flask_socketio import join_room, leave_room, send, emit
from server.app.models import Message, Conversation, MessageType
from flask import request
from datetime import datetime


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    leave_room(request.sid)


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
    message = data['message']
    channel_id = data['channel_id']
    user_id = data['user_id']
    time = float(data['time'])/1000
    message_type = MessageType(data['type'])
    conversation_id = db.session.query(Conversation.id).filter(
        Conversation.id == channel_id).scalar()
    new_message = Message(user_id=user_id, message=message,
                          conversation_id=conversation_id, time=datetime.fromtimestamp(time),
                          type=message_type)
    db.session.add(new_message)
    db.session.commit()
    # Broadcast the message to everyone in the room except the sender
    emit('message', data, room=channel_id, include_self=False)

