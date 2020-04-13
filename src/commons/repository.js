const resError = require("./error");

const list = () => res =>
    async model => {
        try {
            return await model.find().sort({ _id: 'descending' });
        } catch (e) {
            return resError(res)("Error ao listar todos os dados");
        }
    }



const existEmail = email => res =>
    async model => {
        try {
            return !await model.findOne(email) ? false : true;
        } catch (e) {
            return resError(res)("Error ao verificar o email");
        }
    }

const listOne = param => res =>
    async model => {
        try {
            return await model.findOne(param);

        } catch (e) {
            return resError(res)("Error ao listar os dados");
        }
    }
const listOneSelect = (param, select) => res =>
    async model => {
        try {
            return await model.findOne(param).select(select);
        } catch (e) {
            return resError(res)("Error ao listar os dados");
        }
    }


const populate = doc => res =>
    async model => {
        try {
            return await model.find().populate(doc);
        } catch (e) {
            return resError(res)("Error ao popular os dados");
        }
    }


const create = params => res =>
    async model => {
        try {
            return await model.create(params);
        } catch (err) {
            return resError(res)("Error ao adicionar as informações");
        }
    }


const remove = _id => res =>
    async model => {
        try {
            return await model.findByIdAndRemove(_id);
        } catch (err) {
            return resError(res)("Error ao excluir as informações");
        }
    }

const update = (_id, params) => res =>
    async model => {
        try {
            return await model.findOneAndUpdate({ _id }, params);
        } catch (err) {
            return resError(res)("Error ao alterar os dados");
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