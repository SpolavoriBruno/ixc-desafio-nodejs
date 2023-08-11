const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const createError = require('http-errors')
const logger = require('morgan')

const passport = require('../config/passport')
const router = require('./routes')

const app = express()
const secret = process.env.SECRET || "AVeryStrongSecret"

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true,
}))
app.use(cookieParser(secret))
app.use(passport.local.initialize)
app.use(passport.local.session)
app.use(helmet())

app.use('/', router)

app.use(function (req, res, next) {
    next(createError(404, "Rota inesistente"))
})

// error handler
app.use(function (err, req, res) {
    res.status(err.status || 500)
    res.json({error: err})
})

module.exports = app
