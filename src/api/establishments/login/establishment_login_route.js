const action = require('./establishment_login');
const route = "/auth/establishment";


module.exports = router => middleware => {
    router.post(route, action.login);    
    router.put(route, action.update);    
    return router
}