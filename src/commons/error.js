
module.exports = res => err => res.status(400).send({ error: err.message });