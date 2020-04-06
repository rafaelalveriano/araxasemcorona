const action = require('./configsite')
const route = "/config/:id?";

module.exports = router => middleware => {
    router.get(route, action.list);
    router.put(route, middleware, action.update);

    return router
}