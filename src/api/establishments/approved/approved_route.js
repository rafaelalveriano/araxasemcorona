const action = require('./approved')
const route = "/establishment/approved/:id?";

module.exports = router => middleware => {
    router.get(route, middleware, action.list_not_approveds);
    router.put(route, middleware, action.update_status);

    return router
}