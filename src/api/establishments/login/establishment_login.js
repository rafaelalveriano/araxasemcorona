const model = require('../../../models/Establishment');
const repo = require('../../../commons/repository');
const error = require('../../../commons/error');
const bcrypt = require('bcrypt');

const verifyPwd = async (pwd, pwdDb) =>
    await bcrypt.compareSync(pwd, pwdDb) ? true : false

const login = async (req, res) => {
    const msg_error = "Usuário ou senha incorreto!";
    const { email, password } = req.body;

    if (!email && !password) return error(res)(msg_error);

    try {
        const establishment = await model.findOne({ email }).select("+email").select("+password");

        if (!email === establishment.email) return error(res)(msg_error);

        if (! await verifyPwd(password, establishment.password)) return error(res)(msg_error);

        return res.send(establishment);
    } catch (err) {
        return error(res)(msg_error);
    }
}


const update = async (req, res) => {
    const error_msg = "Não foi possível  alterar os seus dados!";
    const params = req.body;
    delete params.approved;
    delete params.id;

    const establishment = await model.findOne({ email: params.email, password: params.password })
        .select("+email")
        .select("+password");

    if (!establishment) return error(error_msg);

    if (establishment.email !== params.new_email)
        params.email = params.new_email;

    if (establishment.password !== params.new_password)
        params.password = await bcrypt.hash(params.new_password, 10);

    delete params.new_email;
    delete params.new_password;

    const updated = await repo.update(establishment.id, params)(res)(model);

    if (updated) {
        return res.status(200).send("Dados alterados com sucesso!");
    } else {
        return error(error_msg);
    }
}

module.exports = {
    login,
    update,
};