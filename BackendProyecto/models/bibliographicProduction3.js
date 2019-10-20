var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bp3Schema = schema({
    ID: Number,
    NOMBRELIBRO: String,
    AUTORES: String,
    RESENIA: String,
    ISBN: String,
    FACULTAD: String,
    FACULTAD2: String,
    COLECCIÓN: String,
    ANIOPUBLICACION: Number, 
    TABLA: String
});

module.exports = mongoose.model('bibliographicProduction3', bp3Schema);