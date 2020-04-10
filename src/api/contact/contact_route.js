const action = require('./contact');
const route = '/contact';

module.exports = router => mid => router.post(route, action.send);