const bcrypt = require('bcrypt');
const model = require('../../../models/Users');
const repo = require('../../../commons/repository');
const { signToken, decodeToken } = require('../../../commons/JwtToken');


const verifyPwd = async (pwd, pwdDb) =>
    await bcrypt.compareSync(pwd, pwdDb) ? true : false


const auth = async (req, res) => {

    const { email, password } = req.body

    if (!await repo.existEmail({ email })(res)(model))
        return res.status(401).send();


    const userByEmail = await repo.listOneSelect({ email }, "+password")(res)(model);


    if (! await verifyPwd(password, userByEmail.password))
        return res.status(401).send({ error: "Usuário ou senha incorreto" });


    const user = { id: userByEmail._id, name: userByEmail.name, email: userByEmail.email };

    const token = signToken({ id: user.id });

    return res.send({ user, token })
}

const valid_token = (req, res) => {
    const bearerToken = req.headers.authorization;

    const split = bearerToken.split(" ");

    const token = split[1];

    const authorization = decodeToken(token);

    return !authorization
        ? res.status(401).send()
        : res.send(authorization);
}

module.exports = { auth, valid_token }