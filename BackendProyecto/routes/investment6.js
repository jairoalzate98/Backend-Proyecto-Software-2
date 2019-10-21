var express = require('express');
var router = express.Router();

const investment6 = require('../models/investment6');

router.get('/', (req, res) => {
    investment6.find({}, (err, inv) => {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!inv) {
            return res.status(404).send("No hay datos");
        }
        res.status(200).send({ inv });
    })
});

router.post('/add', (req, res) => {
    let prueba = req.body;
    for(var i = 0; i < prueba.length; i++){
        let invest = new investment6();
        invest.ID = prueba[i].ID;
        invest.Estado = prueba[i].Estado;
        invest.Numero = prueba[i].Numero;
        invest.Fecha = prueba[i].Fecha;
        invest.Valor = prueba[i].Valor;
        invest.Tipo = prueba[i].Tipo;
        invest.Objeto = prueba[i].Objeto;
        invest.Unidad = prueba[i].Unidad;
        invest.Identificacion = prueba[i].Identificacion;
        invest.Tercero = prueba[i].Tercero;
        invest.Centrocosto = prueba[i].Centrocosto;
        invest.Anio = prueba[i].Anio;
        invest.FACULTAD = prueba[i].FACULTAD;
        invest.TABLA = prueba[i].TABLA;

        invest.save((err, investStored) => {
            if(err){
                console.log("error al salvar el producto" + err);
            }
           console.log({invest: investStored});
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
    console.log(facu);
    var years = [2014, 2015, 2016, 2017, 2018];
    let data = [];
    let value = 0;
    years.forEach(function(element) {
        investment6.find({"FACULTAD": facu, Anio: element}, function (err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            for(var i = 0; i < inv.length; i++){
                value += inv[i].Valor;
            }
            data.push({'Anio': element,  'Total': value});
            value = 0;
        });
    });
    await resolveAfter10Seconds(10);
    res.send(data);
}

function getFaculty(fac){
    switch(fac){
        case 1:
            return "Ciencias";
        case 2:
            return "CIENCIAS AGROPECUARIAS";
        case 3:
            return "Ciencias de la Educación";
        case 4:
            return "Ciencias de la salud";
        case 5:
            return "Ciencias Economicas y administrativas";
        case 6:
            return "Derecho y Ciencias Sociales";
        case 7:
            return "Estudios a Distancia";
        case 8:
            return "INGENIERIA";
        case 9:
            return "Chiquinquira";
        case 10:
            return "Duitama";
        case 11:
            return "Sogamoso";
    }
}

function resolveAfter10Seconds(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(x);
    }, 6000);
    });
}

module.exports = router;