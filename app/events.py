@socketio.on('message')
def handle_message(message):
    print('Received message: ' + message)
    # Broadcast the message to all clients
    socketio.emit('message', message)