const resError = require("./error");

const list = () => res =>
    async model => {
        try {
            return await model.find().sort({ _id: 'descending' });
        } catch (e) {
            return resError(res)(e);
        }
    }



const existEmail = email => res =>
    async model => {
        try {
            return !await model.findOne(email) ? false : true;
        } catch (e) {
            return resError(res)(e);
        }
    }

const listOne = param => res =>
    async model => {
        try {
            return await model.findOne(param);

        } catch (e) {
            return resError(res)(e);
        }
    }
const listOneSelect = (param, select) => res =>
    async model => {
        try {
            return await model.findOne(param).select(select);
        } catch (e) {
            return resError(res)(e);
        }
    }


const populate = doc => res =>
    async model => {
        try {
            return await model.find().populate(doc);
        } catch (e) {
            return resError(res)(e);
        }
    }


const create = params => res =>
    async model => {
        try {
            return await model.create(params);
        } catch (err) {
            resError(res)(err);
        }
    }


const remove = _id => res =>
    async model => {
        try {
            return await model.deleteOne({ _id });
        } catch (err) {
            return resError(res)(err)
        }
    }

const update = (_id, params) => res =>
    async model => {
        try {
            return model.updateOne({ _id }, params);
        } catch (err) {
            return resError(res)(err);
        }
    }

module.exports = {
    list,
    existEmail,    
    listOneSelect,
    listOne,
    populate,
    create,
    remove,
    update,
}        