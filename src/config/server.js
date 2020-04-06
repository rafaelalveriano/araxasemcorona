const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('../middlewares/Cors')
const db = require("./mongoose");
const morgan = require("morgan")

app.disable('etag');
app.use(morgan("tiny"))
app.use(cors)
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Api running on server'))


app.listen(3001)



module.exports = app;