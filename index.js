const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');



// * Config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// * Middlewares

// Send static files
// ? Va a entrar a la carpeta public y el primer archivo que va a obtener es index.html
// ? El path.join es para resolver el tema de los slash (en windows y linux son diferentes)
// ? __dirname es una constante que te muestra la ruta de donde esta el proyecto
app.use('/', express.static(path.join(__dirname, 'public')));

// ! Otra forma de hacerlo
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// });

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

const io = SocketIO(server);

// Websockets
io.on('connect', (socket) => {
    console.log('connected: ', socket.id);

    socket.on('chat:message', (data) => {
        // console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        // ! Cuando quieras enviar un mensaje menos a ti, agrega un broadcas
        socket.broadcast.emit('chat:typing', data);
    });
});



