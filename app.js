const express = require('express');
const authRoutes = require('./routes/account/auth.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');



const app = express();


// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri, {})
  .then(() => {
    console.log('Мы подключились к БД приложения!!!');
  })
  .catch((error) => {
    console.log('Ошибка подключения к БД:', error);
  });



// Регистрируем Morgan 
app.use(morgan('dev'));



// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Регистрируем Cors
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));


// Инициализируем passport и подключаем файл обработчик для логики защиты и проверки роутов
app.use(passport.initialize());
require('./middleware/passport')(passport);


// Регистрируем роут auth
app.use('/api/account/auth', authRoutes);


// Добавляем возможность отдавать с сервера картинки по запросу. (Когда будет запрос к uploads, делай эту папку статической)
app.use('/uploads/account', express.static('uploads/account'));


// Экспортируем наружу
module.exports = app;