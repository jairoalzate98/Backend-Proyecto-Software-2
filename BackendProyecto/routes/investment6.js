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

module.exports = router;