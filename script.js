document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Retrieve user data from sessionStorage
    const userName = sessionStorage.getItem('userName') || 'there';
    const userDomain = sessionStorage.getItem('userDomain') || 'an interesting area';

    // Function to append messages to the chat window
    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        // Trigger reflow to restart animation for new elements
        void messageDiv.offsetWidth;
        messageDiv.style.animationPlayState = 'running';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Initial bot message using collected data
    appendMessage(`Hello ${userName}! Welcome. You mentioned being interested in ${userDomain}. How can I help you generate a startup idea around this, or something else?`, 'bot');


    async function handleUserInput() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user');
        userInput.value = '';

        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.textContent = '...';
        chatWindow.appendChild(typingIndicator);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        setTimeout(() => {
            chatWindow.removeChild(typingIndicator);
            let botResponse = "That's an interesting thought! Tell me more about that problem space.";

            // Example of how to use stored domain in a response
            if (message.toLowerCase().includes('idea')) {
                if (userDomain && userDomain !== 'an interesting area') {
                     botResponse = `Given your interest in ${userDomain}, how about an idea for a platform that connects users directly with local producers in the ${userDomain} sector?`;
                } else {
                    botResponse = "To generate a startup idea, I need a bit more detail. Could you tell me about a specific problem you've observed or an industry you're passionate about?";
                }
            }
            else if (message.toLowerCase().includes('food')) {
                botResponse = "Ah, food! How about an AI-powered app that suggests unique recipes based on ingredients you already have, minimizing food waste?";
            } else if (message.toLowerCase().includes('education')) {
                botResponse = "Education is vital! What if there was a platform connecting students with retired professionals for practical skill mentorship?";
            } else if (message.toLowerCase().includes('healthcare')) {
                botResponse = "Healthcare is a critical area. Perhaps a mobile platform for tracking chronic disease symptoms and providing personalized wellness tips?";
            } else {
                botResponse = "Interesting! To generate a startup idea, I need a bit more detail. Could you tell me about a specific problem you've observed or an industry you're passionate about?";
            }
            appendMessage(botResponse, 'bot');
        }, 1200); // Simulate bot response delay
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    // Optional: Add focus animation to the input field
    userInput.addEventListener('focus', () => {
        userInput.style.borderColor = '#1976d2';
        userInput.style.boxShadow = '0 0 7px rgba(25, 118, 210, 0.5)';
    });

    userInput.addEventListener('blur', () => {
        userInput.style.borderColor = '#ccc';
        userInput.style.boxShadow = 'none';
    });
});