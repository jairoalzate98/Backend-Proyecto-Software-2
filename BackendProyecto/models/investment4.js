var mongoose = require('mongoose');
var schema = mongoose.Schema;

var investment4Schema = schema({
    Facultad: String,
    Grupo: String,
    Noproductos: Number,
    Publindex: {type: String, default: ""},
    SJRoJCR: {type: String, default: ""},
    Nombredeproducto: {type: String, default: ""},
    Fuente: {type: String, default: ""},
    NoSalarios: {type: Number, default: 0},
    Valor: {type: Number, default: 0},
    GrupLAC: {type: String, default: ""},
    Observaciones: {type: String, default: ""},
    Distribución: {type: String, default: ""},
    SMMLV: {type: String, default: ""},
    Nodeproductosporfacultad: {type: Number, default: 0},
    Noproductosporgrupo:{type: Number, default: 0},
    Tipodeproducto: String,
    TABLA: String
});

module.exports = mongoose.model('investment4', investment4Schema);