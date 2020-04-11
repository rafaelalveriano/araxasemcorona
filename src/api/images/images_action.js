
const upload = (req, res) => {
    
    if (req.invalidFile) {
        return res.status(400).send(req.invalidFile)
    }

    const imgLink = `images/upload/${req.file.filename}`

    return res.send(imgLink)
}

const upload_sector = (req, res) => {

    if (req.invalidFile) {
        return res.status(400).send(req.invalidFile)
    }

    const imgLink = `images/sectors/${req.file.filename}`

    return res.send(imgLink)
}

module.exports = { upload ,upload_sector}