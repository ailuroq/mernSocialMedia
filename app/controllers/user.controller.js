const db = require('../models')
const User = db.user
const upload = require('./../middlewares/upload')
const path = require('path')

exports.userProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        }).populate('posts')
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Something gone wrong, try again' })
    }
}

exports.uploadFile = async (req, res) => {
    try {
        await upload(req, res)

        console.log(req.file)
        if (req.file === undefined) {
            return res.send(`You must select a file.`)
        }

        return res.send(`File has been uploaded.`)
    } catch (error) {
        console.log(error)
        return res.send(`Error when trying upload image: ${error}`)
    }
}

