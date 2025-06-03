const mongoose = require('mongoose')



async function connecttoDatabase() {
    await mongoose.connect('mongodb+srv://cms:admin@cluster0.tlargv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Database connected successfully')
}

module.exports = connecttoDatabase