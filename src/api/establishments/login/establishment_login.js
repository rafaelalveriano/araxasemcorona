const model = require('../../../models/Establishment');
const repo = require('../../../commons/repository');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password)
        return res.status(400).send({ error: "Usuário ou senha incorreto!" });

    try {
        const establishments = await model.findOne({ email })
        return res.send(establishments);
    } catch (err) {
        return res.status(400).send({ error: "Error ao lista o estabelecimento" })
    }
}

const update = async (req, res) => {
    const { id } = req.params;

    const params = req.body;
    delete params._id;
    delete params.approved;

    if (!id) return res.status(400).send();

    const sectors = await repo.update(id, params)(res)(model);

    return res.send(sectors);

}

module.exports = {
    login,
    update,
};