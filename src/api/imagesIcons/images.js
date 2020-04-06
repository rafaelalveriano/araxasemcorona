const error = require('../../commons/error');
const path = require('path')
const fs = require('fs');

const list = async (req, res) => {
    const dir_flags = path.resolve(__dirname, '..', '..', '..', 'assets', 'images', 'sectors')

    if (!fs.lstatSync(dir_flags).isDirectory)
        return res.status(400).send('Directory deleted')

    const flags = await fs.readdirSync(dir_flags)
        .filter(file => file.match(".png") || file.match(".jpg") || file.match(".jpeg"))

    const link_flag_image = flags.map(flag =>
        `images/sectors/${flag}`)

    return res.send(link_flag_image)
}

module.exports = {

    list
}