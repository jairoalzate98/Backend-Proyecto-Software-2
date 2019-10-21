var express = require('express');
var router = express.Router();

const investment5 = require('../models/investment5');

router.get('/', (req, res) => {
    investment5.find({}, (err, inv) => {
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
        let invest = new investment5();
        invest.Fecha = prueba[i].Fecha;
        invest.Centro = prueba[i].Centro;
        invest.Facultad = prueba[i].Facultad;
        invest.Liquidacion = prueba[i].Liquidacion;
        invest.Valorrecaudo = prueba[i].Valorrecaudo;
        invest.Documento = prueba[i].Documento;
        invest.Vigenciadocumento = prueba[i].Vigenciadocumento;
        invest.Nodocumento = prueba[i].Nodocumento;
        invest.Banco = prueba[i].Banco;
        invest.Nocuenta = prueba[i].Nocuenta;
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
    var years = [2014, 2015, 2016, 2017, 2018];
    let data = [];
    let value = 0;
    years.forEach(function(element) {
        investment5.find({"Facultad": facu, Vigenciadocumento: element}, function (err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            for(var i = 0; i < inv.length; i++){
                value += inv[i].Valorrecaudo;
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
            return "Ciencias Agropecuarias";
        case 3:
            return "Ciencias de la Educación";
        case 4:
            return "CIENCIAS DE LA SALUD";
        case 5:
            return "Ciencias Economicas y administrativas";
        case 6:
            return "Derecho y Ciencias Sociales";
        case 7:
            return "Estudios a Distancia";
        case 8:
            return "INGENIERIA";
        case 9:
            return "Chiquinquirá";
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