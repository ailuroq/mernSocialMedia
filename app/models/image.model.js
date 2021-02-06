const { model, Types, Schema } = require('mongoose')

const Image = new Schema({
    path: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    authorId: { type: Types.ObjectId, ref: 'User' }
})


module.exports = model('Image', Image)
