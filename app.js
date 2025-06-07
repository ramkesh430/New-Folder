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
  const { title,subtitle,description,image } = req.body
  const filename = req.file.filename

  if(!title || !subtitle || !description || !image) {
    return res.status(400).json({
      message: 'Please provide all required fields: title, subtitle, description, image'
    })
  }
  await Blog.create({
    title : title,
    subtitle: subtitle,
    description: description,
    image: filename
  })


  res.status(200).json({
    message: 'Blog api hit successfully!'
  })
})

app.get('/blog', async (req, res) =>{
  const blogs = await Blog.find() // returns array of all blogs
  res.status(200).json({
    message: 'Blogs fetched successfully!',
    data: blogs
  })
})

app.get('/blog/:id', async (req, res) => {
  const id = req.params.id // Get the blog ID from the request parameters
  blog = await Blog.findById(id) // returns a single blog by id
  res.status(200).json({
    message: 'Blog fetched successfully!',
    data: blog
  })
})

app.delete('/blog/:id', async (req, res) => {
  const id = req.params.id // Get the blog ID from the request parameters
  blog = await Blog.findByIdAndDelete(id) // Delete the blog by id
  res.status(200).json({
    message: 'Blog deleted successfully!',
    data: blog
  })
})

app.use(express.static('./storage')) // Serve static files from the 'storage' directory

app.listen(process.env.PORT, () => {
  console.log('Nodejs project has started')
})


//mongodb+srv://cms:admin@cluster0.tlargv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0