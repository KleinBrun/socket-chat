
class Users {
    constructor() {
        this.personas = [];
    }

    addPerson(id, nombre, sala) {
        let persona = { id, nombre: nombre, sala: sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPerson(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPeople() {
        return this.personas;
    }

    getPeopleForsala(sala) {
        let peopleForsala = this.personas.filter(persona => persona.sala === sala);
        return peopleForsala;
    }

    deletePerson(id) {
        let deletePerson = this.getPerson(id);
        this.personas = this.personas.filter(persona => persona.id !== id);
        return deletePerson;
    }
}

module.exports = { Users };