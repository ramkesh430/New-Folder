require('dotenv').config()  // This line loads environment variables from a .env file into process.env
const express = require('express')
const connecttoDatabase = require('./database')
const Blog = require('./model/blogmodel')

const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
const { multer, storage } = require('./middleware/multerConfig')
const upload = multer({ storage: storage })



connecttoDatabase()

app.get('/',(req,res) => {
  res.json({
    status: 200,
    message: 'This is Home page!'
  })
})

app.get('/about',(req,res) => {
  res.json({
    status: 200,
    message: 'This is About page!'
  })
})

app.post('/blog',upload.single('image'),async (req,res) => {
  console.log(req.body)
  // const description = req.body.description
  // const title = req.body.title
  // const subtitle = req.body.subtitle
  // const image = req.body.image
  // Alternatively, you can use destructuring to extract the properties
  const { title, subtitle, description, image } = req.body
  if(!title || !subtitle || !description || !image) {
    return res.status(400).json({
      message: 'Please provide all required fields: title, subtitle, description, image'
    })
  }
  await Blog.create({
    title : title,
    subtitle: subtitle,
    description: description,
    image: image
  })


  res.status(200).json({
    message: 'Blog api hit successfully!'
  })
})

app.listen(process.env.PORT, () => {
  console.log('Nodejs project has started')
})


//mongodb+srv://cms:admin@cluster0.tlargv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0