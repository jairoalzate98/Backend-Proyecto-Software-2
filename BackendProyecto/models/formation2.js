var mongoose = require('mongoose');
var schema = mongoose.Schema;

var formation2Schema = schema({
    Convocatoria: String,
    ANIOEJECUCION: Number,
    Entidadpostulante: String,
    DepartamentoEntidadpostulante: String,
    ProgramaCTIGrupo: String,
    Centro: String,
    NombreGrupo: String,
    SGI: Number,
    CodColciencias: String,
    Facultad: String,
    Programa: String, 
    AreaOCDE: String,
    TipodeDocumentoIdentificaciondeljoven: String,
    DocumentoIdentificaciondeljoven: Number,
    Nombredeljoven: String,
    correo: String,
    TABLA: String
});

module.exports = mongoose.model('formation2', formation2Schema);