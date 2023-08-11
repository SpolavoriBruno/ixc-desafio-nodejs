const { Schema, SchemaTypes } = require('mongoose')
const db = require('../../config/db')
const { hashPassword } = require('../utils/password')

const { String, Number, Date } = SchemaTypes

const schema = new Schema({
    name: String,
    username: String,
    password: String,
    salt: String,
    lastSeen: Date
})

class UserClass {
    static async update(id, data) {
        const user = await User.findById(id)

        if (data.username && data.username !== user.username)
            user.username = data.username

        if (data.password) {
            const { hash, salt } = hashPassword(data.password)
            user.password = hash
            user.salt = salt
        }

        return await user.save()
    }

    static async userExists(username) {
        return !! await User.findOne({ username: username })
    }

    static async findByUsername(username) {
        return await this.findOne({ username })
    }

    static async getOnlineUsers() {
        const onlineUsers = await User.find({ online: true })
        return onlineUsers.map(user => user.username)
    }
}

schema.loadClass(UserClass)
const User = db.model('User', schema)

module.exports = User
