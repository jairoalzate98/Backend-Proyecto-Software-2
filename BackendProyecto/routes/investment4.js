var express = require('express');
var router = express.Router();

const investment4 = require('../models/investment4');

router.get('/', (req, res) => {
    investment4.find({}, (err, inv) => {
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
        let invest = new investment4();
        invest.Facultad = prueba[i].Facultad;
        invest.Grupo = prueba[i].Grupo;
        invest.Noproductos = prueba[i].Noproductos;
        invest.Publindex = prueba[i].Publindex;
        invest.SJRoJCR = prueba[i].SJRoJCR;
        invest.Nombredeproducto = prueba[i].Nombredeproducto;
        invest.Fuente = prueba[i].Fuente;
        invest.NoSalarios = prueba[i].NoSalarios;
        invest.Valor = prueba[i].Valor;
        invest.GrupLAC = prueba[i].GrupLAC;
        invest.Observaciones = prueba[i].Observaciones;
        invest.Distribucion = prueba[i].Distribucion;
        invest.SMMLV = prueba[i].SMMLV;
        invest.Tipodeproducto = prueba[i].Tipodeproducto;
        invest.Nodeproductosporfacultad = prueba[i].Nodeproductosporfacultad;
        invest.Noproductosporgrupo = prueba[i].Noproductosporgrupo;
        invest.TABLA = prueba[i].TABLA;
        invest.Tipodeproducto = prueba[i].Tipodeproducto;

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
    let data = [];
    investment4.find({"Facultad": facu}, async function (err, inv) {
        if(err){
             return res.status(500).send("Error al realizar la peticion");
        } 
        if(!inv) {
            return res.status(404).send("No hay datos");
        }
        for(var i = 0; i < inv.length; i++){
            if(!verifyGroup(data, inv[i].Grupo)){
                data.push(inv[i].Grupo);
            }
        }
    });
    await resolveAfter10Seconds(10);
    makeReport(data, facu, res);
}

async function makeReport(data, facu, res){
    let report = [];
    let value = 0;
    let productNumber = 0;
    data.forEach(function (element) {
        investment4.find({"Facultad": facu, "Grupo": element}, function (err, inv) {
            if(err){
                 return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            for(var i = 0; i < inv.length; i++){
                value += inv[i].Valor;
                if(facu == 'FESAD'){
                    productNumber += inv[i].Noproductosporgrupo;
                }else {
                    productNumber += inv[i].Noproductos ;
                }
            }
            report.push({"Grupo": element, "Numero de elementos": productNumber, "Valor": value});
            value = 0;
            productNumber = 0;
        });
    });
    await resolveAfter10Seconds(10);
    res.send(report);
}

function verifyGroup(data, type){
    for(var i = 0; i < data.length; i++){
        if(data[i].Grupo == type){
            return true;
        }
    }
    return false;
}

function resolveAfter10Seconds(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(x);
    }, 6000);
    });
}

function getFaculty(fac){
    switch(fac){
        case 1:
            return "Ciencias";
        case 2:
            return "Agropecuarias";
        case 3:
            return "Educación";
        case 4:
            return "CIENCIAS DE LA SALUD";
        case 5:
            return "Economicas";
        case 6:
            return "DERECHO Y CIENCIAS  SOCIALES";
        case 7:
            return "FESAD";
        case 8:
            return "INGENIERIA";
        case 9:
            return "SECCIONAL CHIQUINQUIRA";
        case 10:
            return "Duitama";
        case 11:
            return "Sogamoso";
    }
}

module.exports = router;