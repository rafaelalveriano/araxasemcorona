const action = require('./deliveryman');
const route = "/deliveryman/:id?";

module.exports = router => middleware => {
    router.get(route, action.list);
    router.post(route, action.add);
    router.put(route, action.update);
    router.delete(route, action.remove);
    
    return router
}