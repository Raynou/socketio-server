// * Frontend
// ? socket es todo el código del frontend que va poder enviar
// ? los eventos al servidor
const socket = io(/* Acá por lo general va el dominio, pero como todo
    esta siendo desplegado en el mismo dominio también
    funciona*/);


// * Elementos del DOM

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', ()=>{
    socket.emit('chat:message', {
        username : username.value,
        message : message.value,
    });
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username.value);
});

// ? Escucha los datos del servidor y los usa en el Frontend
// * Idea: Vacíar el input cada vez que envías mensaje
socket.on('chat:message', (data)=>{
    console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
})

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p><em>${data}</em> is typing...</p>`
})

