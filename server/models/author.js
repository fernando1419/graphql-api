const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

// Modelo o Coleccion "Book" que tendrá objetos del tipo bookSchema. 
module.exports = mongoose.model('Author', authorSchema);