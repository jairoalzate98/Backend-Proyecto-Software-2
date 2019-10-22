var express = require('express');
var router = express.Router();

const capacity2 = require('../models/capacity2');

router.get('/', (req, res) => {
    capacity2.find({}, (err, cap) => {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!cap) {
            return res.status(404).send("No hay datos");
        }
        res.status(200).send({ cap });
    })
});

router.post('/add', (req, res) => {
    let prueba = req.body;
    for(var i = 0; i < prueba.length; i++){
        let capacity = new capacity2();
        capacity.Identificacion = prueba[i].Identificacion;
        capacity.Nombres = prueba[i].Nombres;
        capacity.Facultad = prueba[i].Facultad;
        capacity.ProgramaAcademico = prueba[i].ProgramaAcademico;
        capacity.Vinculacion = prueba[i].Vinculacion;
        capacity.Vinculacion2 = prueba[i].Vinculacion2;
        capacity.NivelEstudios = prueba[i].NivelEstudios;
        capacity.Anio = prueba[i].Anio;
        capacity.PeriodoAcademico = prueba[i].PeriodoAcademico;
        capacity.Genero = prueba[i].Genero;
        capacity.Edad = prueba[i].Edad;
        capacity.TipoInvestigadorColciencias781_2017 = prueba[i].TipoInvestigadorColciencias781_2017;
        capacity.TABLA = prueba[i].TABLA;

        capacity.save((err, capacityStored) => {
            if(err){
                console.log("error al salvar el producto" + err);
            }
           console.log({capacit: capacityStored});
        });
    }
    res.send('ok');
});

router.post('/getData', (req, res) => {
    sendData(req, res);
})

async function sendData(req, res){
    var faculty = req.body.facultyId;
    var facu = getFaculty(faculty);
    let data = [];
    capacity2.find({"Facultad": facu}, function (err, inv) {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!inv) {
            return res.status(404).send("No hay datos");
        }
        for(var i = 0; i < inv.length; i++){
            if(!verifyType(data, inv[i].TipoInvestigadorColciencias781_2017)){
                data.push(inv[i].TipoInvestigadorColciencias781_2017);
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
            capacity2.find({"Facultad": facu, "Anio": elementYear, "TipoInvestigadorColciencias781_2017": element}, function(err, inv) {
                if(err){
                    return res.status(500).send("Error al realizar la peticion");
                } 
                if(!inv) {
                    return res.status(404).send("No hay datos");
                }
                report.push({'Anio': elementYear, 'Tipo': element, 'Total': inv.length});
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

function verifyType(data, type){
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
            return "CIENCIAS DE LA SALUD";
        case '5':
            return "CIENCIAS ECONOMICAS Y ADMINISTRATIVAS";
        case '6':
            return "DERECHO Y CIENCIAS  SOCIALES";
        case '7':
            return "ESTUDIOS A DISTANCIA";
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
        }, 10000);
    });
}

module.exports = router;