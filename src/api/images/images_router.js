const { singileUpload } = require('../../middlewares/multer')
const action = require('./images_action')
const route = "/image/upload"

module.exports = router => middleware => {
    router.post(route, middleware, singileUpload('file'), action.upload)

    return router
}