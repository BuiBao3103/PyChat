from app import socketio
from flask_socketio import SocketIO, join_room, leave_room

@socketio.on('join')
def on_join(data):
    username = data['username']
    channel_id = data['channel_id']
    join_room(channel_id)
    socketio.emit('user_joined', {'username': username}, room=channel_id)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    channel_id = data['channel_id']
    leave_room(channel_id)
    socketio.emit('user_left', {'username': username}, room=channel_id)
