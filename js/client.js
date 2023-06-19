const socket = io('http://localhost:3001');

const form = document.querySelector('#send');
const messageInput = document.querySelector('#msginp');
const messageContainer = document.querySelector('.container');
var audio=new Audio('not.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
 if(position=='left') {
  audio.play();
}
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

do{
  username = prompt('Enter your name to join');
}while(!username);


socket.emit('new-user-joined', username);

socket.on('user-joined', (ename) => {
  append(`${ename} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left',name=> {
  append(`${name} left the chat`, 'right');
});
