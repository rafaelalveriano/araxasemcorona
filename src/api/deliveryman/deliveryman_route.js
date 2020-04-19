const action = require('./deliveryman');
const route = "/deliveryman/:id?";
const route_clinet = "/deliverymans";

module.exports = router => middleware => {
    router.get(route, middleware, action.list);
    router.get(route_clinet, action.list_client);
    router.post(route, action.add);
    router.put(route, middleware, action.update);
    router.delete(route, middleware, action.remove);

    return router
}