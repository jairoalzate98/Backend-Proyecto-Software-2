var mongoose = require('mongoose');
var schema = mongoose.Schema;

var capacity2Schema = schema({
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
    TipoInvestigadorColciencias781_2017: String,
    TABLA: String
});

module.exports = mongoose.model('capacity2', capacity2Schema);