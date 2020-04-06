
const path = require('path');
const router = require('express').Router();
const app = require('./src/config/server');
const load = require('./src/config/autoload');
const AuthRoute = require('./src/middlewares/AuthRoute');
const assets = require('./src/config/assets');


assets(app, __dirname);

const src = path.join(__dirname, 'src/api/')

const middlewares = [AuthRoute];

assets(app, __dirname);

load('/api', src, 'route', middlewares)(app)(router);
