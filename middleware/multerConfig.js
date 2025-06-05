const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage') // Specify the directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, 'Ramkesh-' + file.originalname) // Append "Ramkesh-" to the original file name
    }
})


module.exports = {
    multer,
    storage,
}