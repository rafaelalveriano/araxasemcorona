const mongoose = require("../config/mongoose");

const Schema = mongoose.Schema;

const SectorSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    categories: [{
        type: Schema.ObjectId,
        ref: 'Categorie',
    }]
});

const model = mongoose.model('Sector', SectorSchema);

module.exports = model;