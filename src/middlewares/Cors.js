module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');    
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept, Content-Type");
        res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
}