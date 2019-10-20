var mongoose = require('mongoose');
var schema = mongoose.Schema;

var formation1Schema = schema({
    Entidad: String,
    Nombre: String,
    Grupo: String,
    CodigoCOL: String,
    SGI: Number,
    Centro: String,
    Facultad: String,
    Programa: String,
    Anio: Number,
    Correo: String,
    Tutor: String, 
    Observaciones: Number,
    Celular: String,
    Categoria693_2014: String,
    Categoria737_2015: String,
    Categoria781_2017: String,
    TABLA: String
});

module.exports = mongoose.model('formation1', formation1Schema);