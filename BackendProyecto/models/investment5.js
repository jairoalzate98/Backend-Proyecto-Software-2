var mongoose = require('mongoose');
var schema = mongoose.Schema;

var investment5Schema = schema({
    Fecha: String,
    Centro: String,
    Facultad: String,
    Liquidacion: String,
    Valorrecaudo: Number,
    Documento: String,
    Vigenciadocumento: Number,
    Nodocumento: Number,
    Banco: String,
    Nocuenta: String,
    TABLA: String
});

module.exports = mongoose.model('investment5', investment5Schema);