var express = require('express');
var router = express.Router();

const formation3 = require('../models/formation3');

router.get('/', (req, res) => {
    formation3.find({}, (err, form) => {
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
        let formation = new formation3();
        formation.ANIO = prueba[i].ANIO;
        formation.NoEstsemilleros = prueba[i].NoEstsemilleros;
        formation.FACULTAD = prueba[i].FACULTAD;
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
    var years = [2014, 2015, 2016, 2017, 2018];
    let data = [];
    let value = 0;
    years.forEach(function(element) {
        formation3.find({"FACULTAD": facu, ANIO: element}, function (err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            for(var i = 0; i < inv.length; i++){
                value += inv[i].NoEstsemilleros;
            }
            data.push({'Anio': element, 'Total': value});
            value = 0;
        });
    });
    await resolveAfter10Seconds(10);
    res.send(data);
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