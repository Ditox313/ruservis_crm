
// Подключаем пакет для работы с загрузкой файлов
const multer = require('multer');

// Пакет для удобной работы с данными в js
const moment = require('moment');

const fs = require('fs');







// Создаем переменную storage. Она описывает как будут хранится и где будут хранится загруженный файлы. 
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const directoryPath = `files/account/users/${req.user._id}`;
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        cb(null, `files/account/users/${req.user._id}`);
    },
    filename(req, file, cb) {
        const date = moment().format('YYYYMMDDSSS');
        const filename = req.body.secondName + '-' + req.body.name + '-' + file.originalname
        cb(null, `${date}-${filename}`);
    }
});



// Валидатор
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};






// Лимитирование размера
const limits = {
    fileSize: 1024 * 1024 * 5
};





module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})