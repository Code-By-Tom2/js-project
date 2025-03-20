// script.js
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Simple bot responses
const botResponses = {
    'hello': 'Hi there! How can I help you?',
    'how are you': 'I\'m doing great, thanks for asking! How about you?',
    'bye': 'Goodbye! Have a nice day!',
    'default': 'I\'m not sure how to respond to that. Can you try something else?'
};

function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;

    // Add user message
    addMessage(message, 'user-message');
    
    const botResponse = getBotResponse(message.toLowerCase());
    setTimeout(() => {
        addMessage(botResponse, 'bot-message');
    }, 1000);
    
    userInput.value = '';
}

function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    return botResponses[message] || botResponses['default'];
}

// Allow sending message with Enter key
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});