const action = require('./sector');
const route = "/sector/:id?";

module.exports = router => middleware => {
    router.get(route, action.list);
    router.post(route, middleware, action.add);
    router.put(route, middleware, action.update);
    router.delete(route, middleware, action.remove);

    return router
}