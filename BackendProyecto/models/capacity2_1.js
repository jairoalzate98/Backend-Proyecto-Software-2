var mongoose = require('mongoose');
var schema = mongoose.Schema;

var capacity2_1Schema = schema({
    Identificacion: Number,
    Nombres: String,
    Facultad: String,
    ProgramaAcademico: String,
    Vinculacion: String,
    Vinculacion2: String,
    NivelEstudios: String,
    Anio: Number,
    PeriodoAcademico: Number,
    Genero: String,
    Edad: Number,
    TipoInvestigadorColciencias781_017: String,
    Columna1: String,
    TABLA: String
});

module.exports = mongoose.model('capacity2.1', capacity2_1Schema);