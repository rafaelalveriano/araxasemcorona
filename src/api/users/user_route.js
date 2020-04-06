const action = require('./user')
const route = "/user/:id?"

module.exports = router => middleware => {
    router.get(route, middleware, action.list)
    router.post(route, middleware, action.store)
    router.delete(route, middleware, action.remove)
    return router
}