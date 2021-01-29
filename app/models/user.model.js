const { model, Schema } = require('mongoose')

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { data: Buffer },
    photos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Photo'
        }
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})


module.exports = model('User', User)
