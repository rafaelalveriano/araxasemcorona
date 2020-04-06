const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const default_dir = path.resolve(__dirname, '..', '..', 'assets', 'images', 'bateries')

const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
]

const multer_config = {
    dest: default_dir,

    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, default_dir),

        filename: (req, file, cb) => {
            crypto.randomBytes(12, (err, hash) => {
                if (err || !allowedMimes.includes(file.mimetype)) return cb(err)

                const [_, ext] = file.originalname.split('.')

                const filename = `${hash.toString('hex')}.${ext}`

                return cb(null, filename)
            })

        }
    }),

    fileFilter: (req, file, cb) => {
        if (allowedMimes.includes(file.mimetype)) {
            return cb(null, true)
        } else {
            req.invalidFile = { error: 'Invalid file type' };
            return cb(null, false);
        }
    }
}


const singileUpload = (field) => multer(multer_config).single(field)

module.exports = { singileUpload }