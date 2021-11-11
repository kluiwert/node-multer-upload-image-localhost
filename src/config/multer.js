const multer = require('multer');
const path = require('path');
const crypto = require('crypto')


module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}` 

                cb(null, fileName);
            });
        },
    }),
    // Definindo o tamnho dos arquivos, só será aceito até 1MB
    limits:{
        fileSize: 1*1024*1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else{
            cb(new Error('Arquivo inválido'))
        }
    },
};