var express = require('express');
var router = express.Router();

const formation1 = require('../models/formation1');

router.get('/', (req, res) => {
    formation1.find({}, (err, form) => {
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
        let formation = new formation1();
        formation.Entidad = prueba[i].Entidad;
        formation.Nombre = prueba[i].Nombre;
        formation.Grupo = prueba[i].Grupo;
        formation.CodigoCOL = prueba[i].CodigoCOL;
        formation.SGI = prueba[i].SGI;
        formation.Centro = prueba[i].Centro;
        formation.Facultad = prueba[i].Facultad;
        formation.Programa = prueba[i].Programa;
        formation.Anio = prueba[i].Anio;
        formation.Correo = prueba[i].Correo;
        formation.Tutor = prueba[i].Tutor;
        formation.Observaciones = prueba[i].Observaciones;
        formation.Celular = prueba[i].Celular;
        formation.Categoria693_2014 = prueba[i].Categoria693_2014;
        formation.Categoria737_2015 = prueba[i].Categoria737_2015;
        formation.Categoria781_2017 = prueba[i].Categoria781_2017;
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
    formation1.find({"Facultad": facu}, function (err, inv) {
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
            formation1.find({"Facultad": facu, "Anio": elementYear, "Programa": element}, function(err, inv) {
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
    report.sort(function(a, b){
        if(a.Anio > b.Anio){
            return 1;
        }else if(a.Anio < b.Anio){
            return -1;
        }else{
            return 0;
        }
    });
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