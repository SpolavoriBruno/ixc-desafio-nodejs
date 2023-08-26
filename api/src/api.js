const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const createError = require('http-errors')
const logger = require('morgan')

const passport = require('../config/passport')
const router = require('./routes')

const app = express()

const {
    SECRET = "AVeryStrongSecret",
    DEBUG_LEVEL = "dev"
} = process.env

const whitelist = ['http://localhost:3000']

app.use(logger(DEBUG_LEVEL))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors({
    credentials: true,
    allowedHeaders: [
        "Accept",
        "Content-Type",
        "Origin",
        "X-Requested-With",
    ],
    origin: (origin, cb) => {
        whitelist.indexOf(origin) !== -1
            ? cb(null, true)
            : cb(new Error('Not allowed by CORS'))
    },
}))
app.use(require('../config/session'))
app.use(cookieParser(SECRET))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

app.use(function (req, res, next) {
    next(createError(404, "Rota inesistente"))
})

// error handler
app.use(function (err, req, res) {
    res.status(err.status || 500)
    res.json({ error: err })
})

module.exports = app
