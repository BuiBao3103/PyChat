// Connect to the Socket.IO server
const socket = io('http://127.0.0.1:5000');

// Event handler for when a user joins a room
const joinRoom = (username, channel_id) => {
    socket.emit('join', { username, channel_id });
};

// Event handler for when a user leaves a room
const leaveRoom = (username, channel_id) => {
    socket.emit('leave', { username, channel_id });
};

// Listen for user joined event
socket.on('user_joined', (data) => {
    console.log(`${data.username} has joined the room.`);
});

// Listen for user left event
socket.on('user_left', (data) => {
    console.log(`${data.username} has left the room.`);
});
