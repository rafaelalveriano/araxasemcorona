const { signToken, decodeToken } = require('../../commons/JwtToken');
const model = require('../../models/Establishment');
const modelCategorie = require('../../models/Categorie');
const repo = require('../../commons/repository');

const valid_token = (bearerToken) => {

    if (!bearerToken) {
        return false;
    }

    const split = bearerToken.split(" ");

    const token = split[1];

    const authorization = decodeToken(token);

    return !authorization
        ? false
        : true;
}


const listById = async (id, res) => {
    try{
        const establishment = await model.findById(id);
        res.send(establishment);
    }catch(err){
        res.status(400).send();
    }

    
}


const list = async (req, res) => {
    const { id } = req.params;
    const bearerToken = req.headers.authorization;
    const authorization = valid_token(bearerToken);

    if (id) return await listById(id, res);

    if (!authorization) {
        const establishment = await repo.list()(res)(model);
        return res.send(establishment);
    } else {
        try {
            const establishment = await model.find()
                .select("+email")
                .select("+password")
                .sort({ _id: 'descending' });

            return res.send(establishment);
        } catch (e) {
            return res.status(400).send("Error ao listar os estabelecimentos");
        }
    }
}

const add = async (req, res) => {
    const establishment = await repo.create(req.body)(res)(model);


    const categorie = await modelCategorie.findById(establishment.categorie);
    categorie.establishments.push(establishment);

    try {
        await categorie.save();
    } catch (err) {
        return res.status(400).send();
    }

    return res.send(establishment);
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
    delete params.approved;

    if (!id) return res.status(400).send();

    const sectors = await repo.update(id, params)(res)(model);

    return res.send(sectors);
}



module.exports = {
    list,
    add,
    update,
    remove
};