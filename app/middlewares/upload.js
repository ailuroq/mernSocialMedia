const util = require('util')
const multer = require('multer')
const path = require('path')
const db = require('../models')
const Image = db.image
const User = db.user

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: async (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname
        const avatar = new Image({
            path: 'public/uploads/' + filename,
            name: filename,
            authorId: req.userId
        })
        await avatar.save()
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $push: { avatar: avatar._id } },
            { new: true, useFindAndModify: false }
        )

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