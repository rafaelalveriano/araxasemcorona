const action = require('./auth_action')

module.exports = router => middleware => {
    router.post("/user/auth/", action.auth);
    router.post("/user/token/", action.valid_token);
    return router;
}
