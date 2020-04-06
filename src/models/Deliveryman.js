const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const DeliverymanSchema = Schema({
    name: {
        type: String,
        required: true,
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
    address: {
        type: String,
    },
    numberBoard: {
        type: String,
        required: true,
    },
    cnh: {
        type: String,
        required: true,
    },
    veichle: {
        type: String,
        required: true,
    },
    hourWork: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true,
    },
});

DeliverymanSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const model = mongoose.model('Deliveryman', DeliverymanSchema);

module.exports = model;