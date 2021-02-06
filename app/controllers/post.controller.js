const db = require('../models')
const mongoose = require('mongoose')
const Post = db.post
const User = db.user

exports.createPost = async (req, res) => {
    const post = new Post({
        text: req.body.text
    })
    await post.save((err, post) => {
        if (err) {
            res.status(500).send({ message: err })
        }
    })
    const user = await User.findByIdAndUpdate(
        req.userId,
        { $push: { posts: post._id } },
        { new: true, useFindAndModify: false }
    ).select('posts').populate('posts')
    res.send(user)
}


exports.deletePost = async (req, res) => {
    const postId = mongoose.Types.ObjectId(req.body.postId)
    await Post.findByIdAndDelete(postId)
    const user = await User.findById(req.userId, ['posts']).populate('posts')
    res.send(user)
}

