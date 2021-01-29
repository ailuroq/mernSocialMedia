const { model, Types, Schema } = require('mongoose')

const Photo = new Schema({
    data: { type: Buffer, required: true },
    date: { type: Date, default: Date.now },
    authorId: { type: Types.ObjectId, ref: 'User' }
})


module.exports = model('Photo', Photo)
