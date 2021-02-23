const { model, Types, Schema } = require('mongoose')
const moment = require('moment')

const Image = new Schema({
    path: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    date: { type: Date, default: () => moment().add(3, 'hours') },
    authorId: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Image', Image)
