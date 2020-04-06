const model = require('../../models/Categorie');
const sectorModel = require('../../models/Sector');
const repo = require('../../commons/repository');


const list = async (req, res) => {
    const categories = await repo.list()(res)(model);


    res.send(categories);
}

const add = async (req, res) => {
    const categorie = await repo.create(req.body)(res)(model);


    const sector = await sectorModel.findById(categorie.sector);

    sector.categories.push(categorie);

    try {
        await sector.save();
    } catch (err) {
        return res.status(400).send()
    }

    return res.send(categorie);
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

    res.send();
}

module.exports = {
    list,
    add,
    update,
    remove
};