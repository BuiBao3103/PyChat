from app import socketio


@socketio.on('my event')
def connected(data):
    print(data)
