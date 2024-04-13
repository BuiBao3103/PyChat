from flask import session
from src import socketio, db
from flask_socketio import join_room, leave_room, send, emit
from src.models import Message, Conversation, MessageType, User
from flask import request
from datetime import datetime


@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('userID')
    session['user_id'] = user_id  # Store user_id in session
    user = User.query.get(user_id)
    user.last_online = None
    db.session.commit()
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    user_id = session.get('user_id')  # Retrieve user_id from session
    if user_id:
        user = User.query.get(user_id)
        user.last_online = datetime.now()
        db.session.commit()
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
    print(data)
    message = data['message']
    channel_id = data['channel_id']
    user_id = data['user_id']
    time = float(data['time'])/1000
    message_type = MessageType(data['type'])
    conversation = Conversation.query.get(channel_id)
    new_message = Message(user_id=user_id, message=message,
                          conversation_id=conversation.id, time=datetime.fromtimestamp(time),
                          type=message_type)
    db.session.add(new_message)
    db.session.commit()
    db.session.refresh(new_message)
    conversation.last_message_id = new_message.id
    db.session.commit()
    # Broadcast the message to everyone in the room except the sender
    emit('message', new_message.to_dict(), room=channel_id)

