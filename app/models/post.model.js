const {model, Types, Schema} = require("mongoose");

const Post = model(
    "Post",
    new Schema({
        text: String,
        date: {type: Date, default: Date.now},
        author: {type: Types.ObjectId, ref: 'User'}
    })
);

module.exports = Post;
