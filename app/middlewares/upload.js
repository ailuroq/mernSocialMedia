const util = require('util')
const multer = require('multer')
const path = require('path')


const rs = () =>
    Math.random()
        .toString(36)
        .slice(-3)

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
        const dir = '/' + rs() + '/' + rs()
        console.log('dir: ' + dir)
        req.dir = dir
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
        console.log(filename)
        cb(null, filename)
    }
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error('Extension')
            return cb(err)
        }
        cb(null, true)
    }
}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware