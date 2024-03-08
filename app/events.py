from app import socketio
from flask_socketio import join_room, leave_room, send
from flask_login import current_user
from flask import request


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
    # Broadcast the message to everyone in the room except the sender
    send(message, room=channel_id, skip_sid=request.sid)
