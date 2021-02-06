const { model, Schema } = require('mongoose')

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    lastOnline: { type: Schema.Types.Date },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    chats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ],
    photos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
})


module.exports = model('User', User)
