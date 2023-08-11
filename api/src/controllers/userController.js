const User = require('../models/userModel')
const { hashPassword } = require('../utils/password')

async function create(body) {
    const { name, username, password } = body
    if (!name || !username || !password) return { error: { message: "You must to fill all fields" } }

    if (await User.userExists(username))
        return { error: { message: "User already exists" } }

    const { hash, salt } = hashPassword(password)

    const newUser = new User({
        name, username, password: hash, salt
    })

    await newUser.save()
    //TODO Emmit socket with user id

    return { id: newUser.id }
}

function update(id, data) {
    if (User.userExists(data.username))
        return { error: { message: "User already exists" } }

    return User.update(id, {
        password: data.password,
        username: data.username,
    })
}

module.exports = {
    create, update
}
