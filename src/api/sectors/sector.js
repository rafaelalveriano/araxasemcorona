const model = require("../../models/Sector");
const repo = require("../../commons/repository");


const list = async (req, res) => {
    const secotrs = await repo.list()(res)(model);
    
    return res.send(secotrs);
};

const add = async (req, res) => {
    const sectors = await repo.create(req.body)(res)(model);

    return res.send(sectors);
}

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send();

    await repo.remove(id)(res)(model);

    return res.send(id);
}

const update = async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    delete params._id;

    if (!id) return res.status(400).send();

    const sectors = await repo.update(id, params)(res)(model);

    res.send(sectors);
}

module.exports = {
    list,
    add,
    update,
    remove
};