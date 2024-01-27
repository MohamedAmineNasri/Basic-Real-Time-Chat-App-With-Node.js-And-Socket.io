const socket = io("http://localhost:3000", { transports: ["websocket"] });
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?')
appendMessage("You Joined");
socket.emit('new-user',name)

socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`);
});
socket.on("user-connected", (name) => {
    appendMessage(`${name} Connected`);
});
socket.on("user-disconnected", (name) => {
    appendMessage(`${name} disconnect`);
});

messageForm.addEventListener('submit', e => {
    //Stop The Page From Refreshing 
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    //empties the message everytime after sending it 
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElemnt = document.createElement('div');
    messageElemnt.innerText = message
    messageContainer.append(messageElemnt)
}

