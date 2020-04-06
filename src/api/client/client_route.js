const action = require('./client');
const route = "/client/:id?";

module.exports = router => middleware => {
    router.get(route, action.list);    
    return router
}