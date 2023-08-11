// https://www.youtube.com/watch?v=IUw_TgRhTBE

const crypto = require('crypto')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('../src/models/userModel')
const { checkPassword } = require('../src/utils/password')

const loginFailedMesssage = { message: 'Incorrect username or password.' }

passport.use("local", new LocalStrategy((username, password, done) => {
    User.findByUsername(username)
        .then(user => {
            if (!user || !checkPassword(user, password)) return done(null, false, loginFailedMesssage)
            return done(null, user)
        }).catch(done)
}))

passport.serializeUser((user, cb) => {
    console.count('serializeUser')
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    console.count('deserializeUser')
    User.findById(id)
        .then(user => cb(null, user))
        .catch(cb)
})

passport.local = {}
passport.local.initialize = passport.initialize()
passport.local.session = passport.session()

module.exports = passport
