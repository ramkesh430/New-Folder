require('dotenv').config()  // This line loads environment variables from a .env file into process.env
const express = require('express')
const connecttoDatabase = require('./database')

const app = express()

connecttoDatabase()

app.get('/',(req,res) => {
  res.json({
    message: 'This is Home page!'
  })
})

app.get('/about',(req,res) => {
  res.json({
    message: 'This is About page!'
  })
})

app.listen(process.env.PORT, () => {
  console.log('Nodejs project has started')
})


//mongodb+srv://cms:admin@cluster0.tlargv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0