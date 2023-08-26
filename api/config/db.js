const mongoose = require('mongoose')

const { MONGO_URI } = process.env

if (!MONGO_URI) process.exit(2)

mongoose.connect(MONGO_URI)

const db = mongoose.connection

db.on('error', console.error.bind(console, "[Mongo Error] -"))
db.on('open', () => {
    console.log("[Mongo] - Connected to database.")
})

module.exports = db
