const session = require('express-session')

const { createClient } = require('redis')

const SECONDS_IN_DAY = 24 * 60 * 60

const {
    COOKIE_TTL = 2,
    HTTPS = false,
    SECRET: secret = "AVeryStrongSecret",
    REDIS_URL = "redis://localhost:6379",
} = process.env

const client = createClient({ url: REDIS_URL })
client.connect()

const store = new (require('connect-redis').default)({
    client,
    prefix: 'session:',
    ttl: COOKIE_TTL * SECONDS_IN_DAY,
    disableTouch: true,
})

module.exports = session({
    secret,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: HTTPS,
        sameSite: true,
        httpOnly: true,
        maxAge: COOKIE_TTL * SECONDS_IN_DAY,
    }
})
