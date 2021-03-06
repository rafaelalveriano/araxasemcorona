const configsModel = require('../../models/Configsite');
const sectorModel = require('../../models/Sector');
const categorieModel = require('../../models/Categorie');
const establishmentModel = require('../../models/Establishment');
const repo = require('../../commons/repository');
const error = require('../../commons/error');

const list = async (req, res) => {

    const config = await repo.list()(res)(configsModel);

    try {
        const sectors = await sectorModel.find({})
            .populate({
                path: "categories",
                model: "Categorie",
                populate: ({
                    path: "establishments",
                    model: 'Establishment',
                    match: { approved: true }
                })
            })
        return res.send({
            config,
            sectors,
        });
    } catch (err) {
        return res.status(400).send();
    }
}

module.exports = { list };