const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMesage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala);

        users.addPerson(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', users.getPeopleForsala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', createMesage('Admin', `${data.nombre} entro al chat`));
        callback(users.getPeopleForsala(data.sala));
    })

    client.on('crearMensaje', (data, callback) => {
        let person = users.getPerson(client.id);
        let mensaje = createMesage(person.nombre, data.mensaje);
        client.broadcast.to(person.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    })

    client.on('disconnect', () => {
        let deletePerson = users.deletePerson(client.id);
        client.broadcast.to(deletePerson.sala).emit('crearMensaje', createMesage('Admin', `${deletePerson.nombre} abandono el chat`));
        client.broadcast.to(deletePerson.sala).emit('listaPersona', users.getPeopleForsala(deletePerson.sala));
    })

    // Mensajes Privados
    client.on('mensajePrivado', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.for).emit('mensajePrivado', createMesage(person.nombre, data.mensaje));
    })
});