var mongoose = require('mongoose');
var schema = mongoose.Schema;

var investment6Schema = schema({
    ID: Number,
    Estado: String,
    Numero: {type: Number, default: 0},
    Fecha: String,
    Valor: Number,
    Tipo: String,
    Objeto: String,
    Unidad: String,
    Identificacion: {type: Number, default: 0},
    Tercero: String,
    Centrocosto: String, 
    Anio: Number,
    FACULTAD: String,
    TABLA: String
});

module.exports = mongoose.model('investment6', investment6Schema);