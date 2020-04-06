
const model = require('../../../models/Establishment');
const repo = require('../../../commons/repository');




const list_not_approveds = async (req, res) => {
    try {
        const establishment = await model.find({ approved: false })
            .select("+email")
            .select("+password")
            .sort({ _id: 'descending' });

        return res.send(establishment);
    } catch (e) {
        return res.status(400).send("Error ao listar os estabelecimentos");
    }    
}


const update_status = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!id && status === undefined) return res.status(400).send();

    try {
        const result = await model.findOneAndUpdate({ _id: id }, { approved: status });
        return res.send("Aprovado com sucesso");
    } catch (err) {
        return res.status(400).send("Error ao alterar o status");
    }


}



module.exports = {
    list_not_approveds,
    update_status,

};