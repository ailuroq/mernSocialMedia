const { authJwt } = require('../middlewares')
const controller = require('../controllers/post.controller')

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/api/:username/', [authJwt.verifyToken], controller.createPost)
    app.post('/api/deletePost/:postId', [authJwt.verifyToken], controller.deletePost)
}
