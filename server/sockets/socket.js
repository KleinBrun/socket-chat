const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMesage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            })
        }

        client.join(data.room);

        users.addPerson(client.id, data.name, data.room);
        client.broadcast.to(data.room).emit('listPeople', users.getPeopleForRoom(data.room));
        callback(users.getPeopleForRoom(data.room));
    })

    client.on('createMesage', (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(person.room).emit('createMesage', createMesage(person.name, data.msg));
    })

    client.on('disconnect', () => {
        let deletePerson = users.deletePerson(client.id);
        client.broadcast.to(deletePerson.room).emit('createMesage', createMesage('Admin', `${deletePerson.name} abandono el chat`));
        client.broadcast.to(deletePerson.room).emit('listPeople', users.getPeopleForRoom(deletePerson.room));
    })

    // Mensajes Privados
    client.on('privateMesage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.for).emit('privateMesage', createMesage(person.name, data.msg));
    })
});