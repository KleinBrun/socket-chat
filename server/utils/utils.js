const createMesage = (name, msg) => {
    return {
        name,
        msg,
        fecha: new Date().getTime()
    }
}

module.exports = { createMesage }