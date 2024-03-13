document.addEventListener('DOMContentLoaded', function () {
    const channelMatch = window.location.pathname.match(/^\/r\/(\d+)$/);
    if (!channelMatch) {
        console.error('Invalid URL format. Expected /r/number');
        return;
    }

    const socket = io();
    const channel_id = channelMatch[1];

    socket.emit('join', {channel_id: channel_id});

    const sendButton = document.querySelector('#sendButton')
    sendButton?.addEventListener('click', function (event) {
        const messageInput = document.querySelector('#messageInput');
        const message = messageInput.value.trim();
        const messageArea = document.querySelector('#messageArea');
        const messageItem = document.createElement('div');
        messageItem.classList.add('message', 'own')
        messageItem.textContent = message;
        messageArea.appendChild(messageItem);
        if (message !== '') {
            socket.emit('message', {channel_id, message});
            messageInput.value = '';
        }
    });

    socket.on('message', function (data) {
        const messageArea = document.querySelector('#messageArea');
        const messageItem = document.createElement('div');
        messageItem.classList.add('message', 'other')
        messageItem.textContent = data;
        messageArea.appendChild(messageItem);
    });
});
