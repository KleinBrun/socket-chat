var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};


socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function (resp) {
        console.log('Usuarios conectadis ', resp);
    })
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('createMesage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMesage', function (mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambios usuarios
// cuando entra o sale del char un usuario
socket.on('listPeople', function (people) {
    console.log(people);
});

// Mensajes Privados
socket.on('privateMesage', function (mensaje) {
    console.log('Mensaje Privado: ', mensaje);
}); 
