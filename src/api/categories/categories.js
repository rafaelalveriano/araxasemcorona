const model = require('../../models/Categorie');
const Sector = require('../../models/Sector');
const repo = require('../../commons/repository');
const error = require('../../commons/error');


const list = async (req, res) => {
    const categories = await repo.list()(res)(model);
    res.send(categories);
}

const add = async (req, res) => {
    const categorie = await repo.create(req.body)(res)(model);

    const sector = await Sector.findById(categorie.sector);

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

    const categorieDeleted = await repo.remove({ _id: id })(res)(model);

    let removeInSector = await Sector.findById(categorieDeleted.sector);
    removeInSector.categories.remove(categorieDeleted._id);

    try {
        await removeInSector.save();
        return res.send(categorieDeleted);
    } catch (err) {
        return res.status(400).send();
    }
}

const update = async (req, res) => {
    const msg_error = "Error ao alterar a categoria";
    const { id } = req.params;
    const params = req.body;
    delete params._id;

    if (!id && !params.sector) return res.status(400).send();

    const categorie = await repo.listOne({ _id: id })(res)(model);
    let removeInSector = await Sector.findById(categorie.sector);
    removeInSector.categories.remove(categorie._id);


    const categorieUpdated = await repo.update(id, params)(res)(model);
    const sector = await Sector.findById(params.sector);
    sector.categories.push(categorieUpdated);

    try {
        await removeInSector.save();
        await sector.save();
        return res.send(categorieUpdated);
    } catch (err) {
        return error(res)(msg_error);
    }
}

module.exports = {
    list,
    add,
    update,
    remove
};