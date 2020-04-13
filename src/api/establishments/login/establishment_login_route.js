const action = require('./establishment_login');
const route = "/auth/establishment/:id?";


module.exports = router => middleware => {
    router.post(route, action.login);    
    router.put(route, action.update);    
    return router
}