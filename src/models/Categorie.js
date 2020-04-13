const mongoose = require("../config/mongoose");
const Sector = require('./Sector');

const Schema = mongoose.Schema;

const CategorieSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    sector: {
        type: Schema.ObjectId,
        ref: 'Sector',
        required: true
    },
    establishments: [{
        type: Schema.ObjectId,
        ref: 'Establishment',
    }],
});



const model = mongoose.model("Categorie", CategorieSchema);

module.exports = model;