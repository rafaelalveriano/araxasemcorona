const model = require('../../models/Users')
const repo = require('../../commons/repository')
const bcrypt = require('bcrypt')

const list = async (req, res) =>
    res.send(await repo.list()(res)(model))


const store = async (req, res) => {
    const users = await repo.create(req.body)(res)(model);

    return res.send(users);
}

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send();

    await repo.remove(id)(res)(model);

    return res.send(id);
}

const verifyPwd = async (pwd, pwdDb) =>
    await bcrypt.compareSync(pwd, pwdDb) ? true : false

module.exports = {
    list,
    store,
    remove,
    verifyPwd
}   