const { signToken, decodeToken } = require('../../commons/JwtToken');
const model = require('../../models/Establishment');
const Categorie = require('../../models/Categorie');
const repo = require('../../commons/repository');
const error = require('../../commons/error');
const bcrypt = require('bcrypt');

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
    try {
        const establishment = await model.findOne({ _id: id });
        res.send(establishment);
    } catch (err) {
        res.status(400).send();
    }


}

const listAuthenticate = async (res) => {
    try {
        const establishment = await model.find().populate('categorie')
            .select("+email")
            .select("+password")
            .sort({ _id: 'descending' });

        return res.send(establishment);
    } catch (e) {
        return res.status(400).send("Error ao listar os estabelecimentos");
    }
}

const list = async (req, res) => {
    const { id } = req.params;
    const bearerToken = req.headers.authorization;
    const authorization = valid_token(bearerToken);

    if (id) return await listById(id, res);

    if (!authorization) {
        const establishment = await repo.populate('categorie')(res)(model);
        return res.send(establishment);
    }


    return listAuthenticate(res);
}

const existEstablishment = async (user) => {
    try {
        const find = await model.findOne({ email: user }).select("+email");
        if (find) {
            return true;
        }
        return false;

    } catch (err) {
        return false;
    }
}

const add = async (req, res) => {
    const { email, categorie } = req.body;
    const exist = await existEstablishment(email);

    if (exist) return res.status(400).send({ error: "Este email já foi cadastrado" });


    const categorieSelected = await Categorie.findById(categorie);

    !categorieSelected && res.status(400).send({ error: "Selecione uma categoria!" });

    const establishment = await repo.create(req.body)(res)(model);

    categorieSelected.establishments.push(establishment);

    try {
        await categorieSelected.save();
    } catch (err) {
        return res.status(400).send();
    }

    return res.send(establishment);
}

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send();

    const establishments = await repo.remove(id)(res)(model);
    if (!establishments) return error(res)("Error ao remover o estabelecimento!");

    const removeInSector = await repo.listOne({ _id: establishments.categorie })(res)(Categorie);
    removeInSector.establishments.remove(establishments._id);

    try {
        await removeInSector.save();
        return res.send(removeInSector);
    } catch (err) {
        return error(res)("Error ao remover o estabelecimento!");
    }
}

const update = async (req, res) => {
    const msg_error = "Error ao alterar o estabelecimento";
    const { id } = req.params;
    const params = req.body;
    delete params._id;
    delete params.approved;

    if (!id) return error(msg_error);

    const establishments = await model.findOne({ _id: id }).select("+email").select("+password");

    if (establishments.email !== params.new_email)
        params.email = params.new_email;

    if (establishments.password !== params.new_password)
        params.password = await bcrypt.hash(params.new_password, 10);

    delete params.new_email;
    delete params.new_password;

    if (!establishments) return error(msg_error);

    // //remove in current categorie
    let removeInCategorie = await repo.listOne({ _id: establishments.categorie })(res)(Categorie);
    removeInCategorie.establishments.remove(id);

    // //update in new  categorie
    const establishmentUpdated = await repo.update(id, params)(res)(model);
    const updateInCategorie = await repo.listOne({ _id: params.categorie })(res)(Categorie);
    updateInCategorie.establishments.push(establishmentUpdated);


    try {
        await removeInCategorie.save();
        await updateInCategorie.save()
        res.send(establishmentUpdated);
    } catch (err) {
        return error(msg_error);
    }
}



module.exports = {
    list,
    add,
    update,
    remove
};