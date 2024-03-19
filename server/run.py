from server.app import app, routes, events, socketio

if __name__ == '__main__':
    socketio.run(app, allow_unsafe_werkzeug=True, host='0.0.0.0', port=5000, debug=True)
