var express = require('express');
var router = express.Router();

const capacity1 = require('../models/capacity1');

router.get('/', (req, res) => {
    capacity1.find({}, (err, cap) => {
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
        let capacity = new capacity1();
        capacity.ANIO = prueba[i].ANIO;
        capacity.A1 = prueba[i].A1;
        capacity.A = prueba[i].A;
        capacity.B = prueba[i].B;
        capacity.C = prueba[i].C;
        capacity.D = prueba[i].D;
        capacity.R = prueba[i].R;
        capacity.FACULTAD = prueba[i].FACULTAD;
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
    var years = [2014, 2015, 2016, 2017, 2018];
    var data = [];
    years.forEach(function(element) {
        capacity1.find({"FACULTAD": facu, ANIO: element}, function (err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            data.push(inv);
        });
    });
    await resolveAfter10Seconds(10);
    res.status(200).send(data);
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

function compareDate(str1){
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    return date1;
}



function resolveAfter10Seconds(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(x);
        }, 5000);
    });
}

module.exports = router;