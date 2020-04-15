const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
]


const default_dir = (dir) => path.resolve(__dirname, '..', '..', 'assets', 'images', dir);

const confStorage = (dir) => multer.diskStorage({

    destination: (req, file, cb) => cb(null, default_dir(dir)),

    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, hash) => {
            if (err || !allowedMimes.includes(file.mimetype)) return cb(err)

            const [_, ext] = file.originalname.split('.')

            const filename = `${hash.toString('hex')}.${ext}`

            return cb(null, filename)
        })

    }
});

const confFilter = () => (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
        return cb(null, true)
    } else {
        req.invalidFile = { error: 'Arquivo inválido' };
        return cb(null, false);
    }
}


const singileUpload = (field, dir) => multer({
    dest: default_dir(dir),
    storage: confStorage(dir),
    fileFilter: confFilter()
}).single(field)

module.exports = { singileUpload }