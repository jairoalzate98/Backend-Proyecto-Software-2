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
        invest.NoProductos = prueba[i].NoProductos;
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

module.exports = router;