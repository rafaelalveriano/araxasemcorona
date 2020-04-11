const { singileUpload } = require('../../middlewares/multer')
const action = require('./images_action')
const route = "/image/upload"
const route_sector = "/image/sector"

module.exports = router => middleware => {
    router.post(route, singileUpload('file', 'upload'), action.upload)
    
    router.post(route_sector,  singileUpload('file','sectors'), action.upload_sector)

    return router
}