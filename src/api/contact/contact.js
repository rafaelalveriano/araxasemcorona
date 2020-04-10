
const sendmailer = require('../../commons/sendmailer');

const send = async (req, res) => {
    const { name, email, subject, text } = req.body;

    if (!name || !email || !subject || !text)
        return res.status(400).send({ error: "preencha todos os campos!" });

    const send = await sendmailer.send({
        from: "araxasemcorona@gmail.com",
        to: "araxasemcorona@gmail.com",
        subject: `ARAXA SEM CORONA - ${subject}`,
        text: `
        Nome: ${name}\n
        Email: ${email}\n
        Email: ${subject}\n
        ${text}
        `
    });

    if (send) {
        return res.send("Sua mensagem foi enviada com sucesso!");
    } else {
        return res.status(400).send({ error: "Error ao enviar sua mensagem" });
    }
}
module.exports = {
    send,
}