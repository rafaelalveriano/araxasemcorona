const model = require('../../models/Configsite');
const repo = require('../../commons/repository');

const add = async (req, res) => {

    var fullUrl = req.protocol + '://' + req.get('host');

    const config_default = {
        logo: fullUrl + "/images/logo_default.png",
        title_home: "É hora de nos unirmos ",
        subtitle_home: "Faça sua parte",
        text_home: "Mais do que nunca é hora estarmos juntos, mesmo que de longe. Este é um espaço com o intuito de combater a proliferação do Coronavirus (COVID-19), ajudando pessoas e empresas da cidade de Araxá. Se você está realizando entregas ou trabalhando remotamente, ou é entregador, nós seremos o elo entre você e seu cliente. ",
        text_about: "A Bugani Comunicação, através deste projeto pretende auxiliar pequenas empresas e profissionais autônomos a divulgarem o seu estabelecimento através de uma plataforma, onde, o usuário terá acesso à diversos segmentos e variedades de empresas durante o período da Pandemia, fazendo com que em um só lugar, seja possível encontrar o que precisa, receber em casa o seu produto e o mais importante, se manter em isolamento social.",
        text_registry: "Agora é o momento de você ajudar a nossa cidade é ainda alavancar o seu negócio neste momento tão díficil. Para você que trabalha com delivery em seu negócio, iremos publicar gratuitamente o seu estabelecimento em nossa paltaforma . E para vocês entregadores iremos indicar o seu trabalho para os estabelecimentos cadastrados aqui.",
    };

    const categorie = await repo.create(config_default)(res)(model);

    return res.send(categorie);
}


const list = async (req, res) => {
    await model.find({}, async (err, configs) => {
        if (err) return res.status(400).send();

        if (!configs.length) {
            await add(req, res);
        } else {
            return res.send(configs);
        }
    });

    // res.send(categories);
}



const update = async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    delete params._id;

    if (!id) return res.status(400).send();

    if (!params.logo || !params.title_home || !params.subtitle_home || !params.text_home || !params.text_about)
        return res.status(400).send();

    const sectors = await repo.update(id, params)(res)(model);

    res.send(sectors);
}

module.exports = {
    list,
    update,
};