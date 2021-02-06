const { model, Types, Schema } = require('mongoose')
const moment = require('moment')
const Post = new Schema({
    text: { type: String, required: true },
    date: { type: Date, default: moment().add(3, 'hour') },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    authorId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Post', Post)
