var mongoose = require('mongoose');
var schema = mongoose.Schema;

var investmentSchema = schema({
    CODIGOPROYECTO: {type: Number, default: 0},
    PROYECTO: String,
    FECHAINICIO: Date,
    ESTADOPROYECTO: String,
    FECHAESTADO: Date,
    FECHAEJECUCION: Date,
    ANIOEJECUCION: {type: Number, default: 2019},
    TIPOFINANCIACION: String,
    FACULTAD: String,
    PROGRAMA: String,
    AREACONOCIMIENTO: String,
    CONVOCATORIA: String,
    CODIGOCENTRO: {type: Number, default: 0},
    CENTRO: String,
    CODIGOGRUPO: {type: Number, default: 0},
    GRUPO: String,
    AREAOCDE: String,
    SIGLA: String,
    NOMBRES: String,
    IDENTIFICACION: {type: Number, default: 0},
    TIPO: String,
    TIPOINVESTIGADOR: String,
    MONTOESPECIEINTERNO: {type: Number, default: 0},
    MONTOEFECTIVOINTERNO: {type: Number, default: 0},
    MONTOEXTERNO1: {type: Number, default: 0},
    ENTIDADEXTERNA1: {type: String, default: ""},
    TIPODEENTIDAD: {type: String, default: ""},
    MONTOEXTERNO2: {type: Number, default: 0},
    ENTIDADEXTERNA2: {type: String, default: ""},
    NOTAS: {type: String, default: ""},
    COMPROMISO: {type: String, default: ""},
    TABLA: String
});

module.exports = mongoose.model('investment', investmentSchema);