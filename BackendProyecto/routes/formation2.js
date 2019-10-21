var express = require('express');
var router = express.Router();

const formation2 = require('../models/formation2');

router.get('/', (req, res) => {
    formation2.find({}, (err, form) => {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!form) {
            return res.status(404).send("No hay datos");
        }
        res.status(200).send({ form });
    })
});

router.post('/add', (req, res) => {
    let prueba = req.body;
    for(var i = 0; i < prueba.length; i++){
        let formation = new formation2();
        formation.Convocatoria = prueba[i].Convocatoria;
        formation.ANIOEJECUCION = prueba[i].ANIOEJECUCION;
        formation.Entidadpostulante = prueba[i].Entidadpostulante;
        formation.DepartamentoEntidadpostulante = prueba[i].DepartamentoEntidadpostulante;
        formation.ProgramaCTIGrupo = prueba[i].ProgramaCTIGrupo;
        formation.Centro = prueba[i].Centro;
        formation.NombreGrupo = prueba[i].NombreGrupo;
        formation.SGI = prueba[i].SGI;
        formation.CodColciencias = prueba[i].CodColciencias;
        formation.Facultad = prueba[i].Facultad;
        formation.Programa = prueba[i].Programa;
        formation.AreaOCDE = prueba[i].AreaOCDE;
        formation.TipodeDocumentoIdentificaciondeljoven = prueba[i].TipodeDocumentoIdentificaciondeljoven;
        formation.DocumentoIdentificaciondeljoven = prueba[i].DocumentoIdentificaciondeljoven;
        formation.Nombredeljoven = prueba[i].Nombredeljoven;
        formation.correo = prueba[i].correo;
        formation.TABLA = prueba[i].TABLA;

        formation.save((err, formationStored) => {
            if(err){
                console.log("error al salvar el producto" + err);
            }
           console.log({formation: formationStored});
        });
    }
    res.send('ok');
});

router.post('/getData', (req, res) => {
    sendData(req, res);
});

async function sendData(req, res){
    var faculty = req.body.facultyId;
    var facu = getFaculty(faculty);
    let data = [];
    formation2.find({"Facultad": facu}, function (err, inv) {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!inv) {
            return res.status(404).send("No hay datos");
        }
        for(var i = 0; i < inv.length; i++){
            if(!verifyProgram(data, inv[i].Programa)){
                data.push(inv[i].Programa);
            }
        }
    });
    await resolveAfter10Seconds(10);
    makeReport(data, facu, res);
}

async function makeReport(data, facu, res){
    var years = [2014, 2015, 2016, 2017, 2018];
    let report = [];
    years.forEach(function(elementYear) {
        data.forEach(function(element) {
            formation2.find({"Facultad": facu, "ANIOEJECUCION": elementYear, "Programa": element}, function(err, inv) {
                if(err){
                    return res.status(500).send("Error al realizar la peticion");
                } 
                if(!inv) {
                    return res.status(404).send("No hay datos");
                }
                report.push({'Anio': elementYear, 'Programa': element, 'Total': inv.length});
            });
        });
    });
    await resolveAfter10Seconds(10);
    res.send(report);
}

function verifyProgram(data, type){
    for(var i = 0; i < data.length; i++){
        if(data[i] == type){
            return true;
        }
    }
    return false;
}

function getFaculty(fac){
    switch(fac){
        case '1':
            return "CIENCIAS";
        case '2':
            return "CIENCIAS AGROPECUARIAS";
        case '3':
            return "CIENCIAS DE LA EDUCACION";
        case '4':
            return "Ciencias de la salud";
        case '5':
            return "CIENCIAS ECONOMICAS Y ADMINISTRATIVAS";
        case '6':
            return "DERECHO Y CIENCIAS  SOCIALES";
        case '7':
            return "Estudios a Distancia";
        case '8':
            return "INGENIERIA";
        case '9':
            return "SECCIONAL CHIQUINQUIRA";
        case '10':
            return "SECCIONAL DUITAMA";
        case '11':
            return "SECCIONAL SOGAMOSO";
    }
}

function resolveAfter10Seconds(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(x);
    }, 8000);
    });
}

module.exports = router;