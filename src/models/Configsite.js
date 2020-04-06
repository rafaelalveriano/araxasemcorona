const mongoose = require("../config/mongoose");

const Schema = mongoose.Schema;

const Configsite = Schema({
    logo: {
        type: String,
    },
    title_home: {
        type: String,
    },
    subtitle_home: {
        type: String,
    },
    text_home: {
        type: String,
    },
    text_about: {
        type: String,
    },
    text_registry: {
        type: String,
    },

});

const model = mongoose.model("Config", Configsite);

module.exports = model;