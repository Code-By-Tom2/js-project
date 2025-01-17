const chatMessages = document.getElementById('chat-messages');

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Display typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('bot-typing');
    typingIndicator.textContent = 'Typing...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Call the backend API
    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        chatMessages.removeChild(typingIndicator);
        if (data.response) {
            addMessage(data.response, 'bot');
        } else {
            addMessage('Error: Unable to get a response.', 'bot');
        }
    } catch (error) {
        chatMessages.removeChild(typingIndicator);
        addMessage('Error: ' + error.message, 'bot');
    }
}
