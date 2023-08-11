const crypto = require('crypto')

const ITERATIONS = 310000
const KEYLEN = 32
const ALGO = 'sha256'
const OUT_FORMAT = 'hex'

function checkPassword(user, password) {
    const parsedPassword = parsePassword(password)
    const hash = crypto.pbkdf2Sync(parsedPassword, user.salt, ITERATIONS, KEYLEN, ALGO).toString(OUT_FORMAT)

    return user.password === hash
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString(OUT_FORMAT)
    const parsedPassword = parsePassword(password)
    const hash = crypto.pbkdf2Sync(parsedPassword, salt, ITERATIONS, KEYLEN, ALGO).toString(OUT_FORMAT)

    return { hash, salt }
}

function parsePassword(str) {
    // TODO caveats when using strings as inputs to cryptographic
    return str
}

module.exports = {
    hashPassword,
    checkPassword
}
