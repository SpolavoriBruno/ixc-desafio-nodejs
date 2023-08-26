const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')

const passport = require('../config/passport')
const session = require('../config/session')
const cookieParser = require('cookie-parser')

const {
    REDIS_URL = "redis://localhost:6379",
    SECRET = "AVeryStrongSecret"
} = process.env

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

module.exports = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        }
    })

    const pubClient = createClient({ url: REDIS_URL })
    const subClient = pubClient.duplicate()

    Promise.all([pubClient.connect(), subClient.connect()])
        .then(() => io.adapter(createAdapter(pubClient, subClient)))

    io.engine.use(cookieParser(SECRET))
    io.engine.use(session)
    io.engine.use(passport.initialize())
    io.engine.use(passport.session())

    io.use(wrap(require('./middlewares/authMiddleware')))

    io.on('connection', (socket) => {
        const clientLog = console.log.bind(console, `[Socket Client ${socket.id}] -`)
        const { user } = socket.request

        clientLog(`User ${user.username} connected`)

        socket.join('global')

        socket.broadcast.emit("online", { timestamp: Date.now(), username: user.username, id: user.id })

        socket.on('message', (data) => {
            clientLog("Write: ", data)
            io.to(data.chat).emit("message", data)
        });

        socket.on("disconnect", (reason) => {
            clientLog(`disconnected due to ${reason}`)
        })
    })
}
