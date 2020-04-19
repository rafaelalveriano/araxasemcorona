const model = require("../../models/Deliveryman");
const repo = require("../../commons/repository");
const error = require("../../commons/error");

const list = async (req, res) => {
    const secotrs = await repo.list()(res)(model);
    return res.send(secotrs);
};

const list_client = async (req, res) => {
    try {
        const deliveryman = await model.find({})
            .select("-address")
            .select("-numberBoard")
            .select("-cnh");

        return res.send(deliveryman);
    } catch (err) {
        return error(res)("Error ao listar dados dos entregadores!");
    }
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
    list_client,
    add,
    update,
    remove
};
