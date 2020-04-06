const action = require('./establishments')
const route = "/establishment/:id?";

module.exports = router => middleware => {
    router.get(route, action.list);
    router.post(route, action.add);
    router.put(route, action.update);
    router.delete(route, middleware, action.remove);

    return router
}