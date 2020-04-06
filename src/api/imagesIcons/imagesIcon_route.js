const action = require('./images');
const route = "/icons/";

module.exports = router => middleware => {
    router.get(route, action.list);

    return router
}