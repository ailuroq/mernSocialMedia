const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const app = express()
const http = require('http').createServer(app)

const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


if (!module.parent) {
    const db = require('./app/models')
    const initial = require('./app/database/initialRoles')
    db.mongoose
        .connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Successfully connect to MongoDB.')
            initial()
        })
        .catch(err => {
            console.error('Connection error', err)
            process.exit()
        })
}


// routes
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/post.routes')(app)

// set port, listen for requests
PORT = 8080
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

module.exports = app