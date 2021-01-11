const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./controllers/auth.controller'))


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
app.listen(PORT, () => console.log('server is running on port ${PORT}'))
