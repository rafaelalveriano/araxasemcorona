const mongoose = require("mongoose");

const uri = "mongodb://localhost/axasemcovid";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => console.log("db connected"));


module.exports = mongoose;