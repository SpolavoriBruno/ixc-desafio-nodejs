const { Server } = require('socket.io')

const clientLog = console.log.bind(console, "[Socket Client] - ")

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    io.on('connection', (socket) => {
        clientLog(`${socket.id} connected`)

        // socket.emit('connect', `${socket.id} connected`)
        
        socket.on('message', (data) => {
            clientLog("Message, recived", data)
            socket.broadcast.emit('message', data)
        });

        socket.on("disconnect", (reason) => {
            clientLog(`${socket.id} disconnected due to ${reason}`)
        })
    })
}
