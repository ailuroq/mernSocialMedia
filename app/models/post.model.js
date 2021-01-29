const { model, Types, Schema } = require('mongoose')

const Post = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    authorId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Post', Post)
