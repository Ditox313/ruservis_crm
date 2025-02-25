const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы users

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/128/4140/4140037.png'
    },


    name: {
        type: String,
        required: true,
    },

    secondName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    dateCreate: {
        type: Date,
        required: true,
        default: Date.now
    }
});



module.exports = mongoose.model('users', User);