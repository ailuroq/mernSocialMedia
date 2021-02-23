const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/api/:username', controller.userProfile)

    app.post('/upload', [authJwt.verifyToken], uploadController.upload)
    app.get('/files', uploadController.getListFiles)
    app.get('/files/:name', uploadController.download)
}