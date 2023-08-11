const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

if(!mongoURI) process.exit(2)

mongoose.connect(mongoURI)

const db = mongoose.connection

db.on('error', console.error.bind(console, "[Mongo Error] -"))
db.on('open', () => {
    console.log("[Mongo] - Connected to database.")
})

module.exports = db
