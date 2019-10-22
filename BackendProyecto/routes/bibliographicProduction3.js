var express = require('express');
var router = express.Router();

const pb3 = require('../models/bibliographicProduction3');

router.get('/', (req, res) => {
    pb3.find({}, (err, pb) => {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!pb) {
            return res.status(404).send("No hay datos");
        }
        res.status(200).send({ pb });
    })
});

router.post('/add', (req, res) => {
    let prueba = req.body;
    for(var i = 0; i < prueba.length; i++){
        let pb = new pb3();
        pb.ID = prueba[i].ID;
        pb.NOMBRELIBRO = prueba[i].NOMBRELIBRO;
        pb.AUTORES = prueba[i].AUTORES;
        pb.RESENIA = prueba[i].RESENIA;
        pb.ISBN = prueba[i].ISBN;
        pb.FACULTAD = prueba[i].FACULTAD;
        pb.FACULTAD2 = prueba[i].FACULTAD2;
        pb.COLECCIÓN = prueba[i].COLECCIÓN;
        pb.ANIOPUBLICACION = prueba[i].ANIOPUBLICACION;
        pb.TABLA = prueba[i].TABLA;

        pb.save((err, pbStored) => {
            if(err){
                console.log("error al salvar el producto" + err);
            }
           console.log({prbl: pbStored});
        });
    }
    res.send('ok');
});

router.post('/getData', (req, res) => {
    sendData(req, res);
});

async function sendData(req, res){
    var facu = getFaculty(req.body.facultyId);
    var years = [2014, 2015, 2016, 2017, 2018];
    var data = [];
    years.forEach(function(element) {
        pb3.find({'FACULTAD2': facu, 'ANIOPUBLICACION': element}, function(err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            data.push({'Anio': element, 'Total': inv.length});
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
        }, 5000);
    });
}

module.exports = router;