const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

// Modelo o Coleccion "Book" que tendrá objetos del tipo bookSchema. 
module.exports = mongoose.model('Book', bookSchema); 