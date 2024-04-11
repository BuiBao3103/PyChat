document.addEventListener('DOMContentLoaded', function () {
    const channelMatch = window.location.pathname.match(/^\/r\/(\d+)$/);
    if (!channelMatch) {
        console.error('Invalid URL format. Expected /r/number');
        return;
    }

    const socket = io('http://localhost:5000');
    const channel_id = channelMatch[1];
    const user_send_id = 1 // get in client
    const type = 'text'

    socket.emit('join', { channel_id: channel_id });

    const sendButton = document.querySelector('#sendButton')
    sendButton?.addEventListener('click', function () {
        const messageInput = document.querySelector('#messageInput');
        const message = messageInput.value.trim();
        const messageContainer = document.querySelector('#messageContainer');
        if (message !== '') {
            socket.emit('message',
                {
                    user_id: user_send_id,
                    channel_id,
                    message,
                    time: Date.now(),
                    type
                });
            messageInput.value = '';
            messageContainer.appendChild(createMessDiv(message, 'end'));
        }
    });

    socket.on('message', function (data) {
        messageContainer.appendChild(createMessDiv(data.message, 'start'));
    });

});
const createMessDiv = (message, location) => {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('d-flex', `justify-content-${location}`, 'mt-1');

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('bg-primary', 'text-white', 'p-2', 'rounded');
    innerDiv.textContent = message;
    outerDiv.appendChild(innerDiv);
    return outerDiv
}