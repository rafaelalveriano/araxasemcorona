const fs = require('fs');
const sharp = require('sharp');
const error = require('../../commons/error');

const compressImg = (image, output, filename) => {
    const img_file = filename.split('.')[0] + "new.jpg";

    const dirSave = `${output}/${img_file}`;

    const compressed = async buffer =>
        sharp(buffer)
            .resize(261, 261)
            .toFormat('jpeg')
            .jpeg({ quality: 75 })
            .toFile(dirSave);

    try {
        const openFile = fs.readFileSync(image);
        compressed(openFile);
        return img_file;
    } catch (err) {
        return false;
    }
}

const remove = file => {
    try {
        fs.unlinkSync(file)
        return true;
    } catch (err) {
        return false;
    }
}

const upload = (req, res) => {
    if (req.invalidFile) {
        return res.status(400).send(req.invalidFile)
    }

    const imgCompressed = compressImg(req.file.path, req.file.destination, req.file.filename);

    if (imgCompressed) {

        if (remove(req.file.path)) {
            const imgLink = `images/upload/${imgCompressed}`;
            return res.send(imgLink)
        } else {
            return error(res)("Error ao enviar a imagem !");
        }

    } else {        
        return error(res)("Error ao enviar a imagem !");
    }
}

const upload_sector = (req, res) => {

    if (req.invalidFile) {
        return res.status(400).send(req.invalidFile)
    }

    const imgLink = `images/sectors/${req.file.filename}`

    return res.send(imgLink)
}

module.exports = { upload, upload_sector }