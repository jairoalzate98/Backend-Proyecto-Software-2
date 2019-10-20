var mongoose = require('mongoose');
var schema = mongoose.Schema;

var formation3Schema = schema({
    ANIO: Number,
    NoEstsemilleros: Number,
    FACULTAD: String,
    TABLA: String
});

module.exports = mongoose.model('formation3', formation3Schema);