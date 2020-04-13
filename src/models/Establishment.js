const mongoose = require("../config/mongoose");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const EstablishmentSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    sector: {
        type: Schema.Types.ObjectId,
        ref: 'Sector',
        required: true
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    email: {
        type: String,
        required: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    description: {
        type: String,
        required: true,
    },
    delivery: {
        type: Boolean,
    },
    hourWork: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true,
    },
    social: {
        type: String,
    },
    img: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
});



EstablishmentSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;    

    next();
});



const model = mongoose.model("Establishment", EstablishmentSchema);

module.exports = model;
