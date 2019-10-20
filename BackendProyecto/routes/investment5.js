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

module.exports = router;