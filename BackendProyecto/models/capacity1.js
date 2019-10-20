var mongoose = require('mongoose');
var schema = mongoose.Schema;

var capacity1Schema = schema({
    ANIO: Number,
    A1: String,
    A: String,
    B: String,
    C: String,
    D: String,
    R: String,
    FACULTAD: String,
    TABLA: String
});

module.exports = mongoose.model('capacity1', capacity1Schema);