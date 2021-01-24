const db = require('../models')
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
    )
    res.send(user)
    console.log(await User.findById(req.userId).populate('posts'))
}
