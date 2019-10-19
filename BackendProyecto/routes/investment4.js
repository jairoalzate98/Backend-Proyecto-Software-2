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
        let invest = new Investment();
        invest.facultad = prueba[i].facultad;
        invest.grupo = prueba[i].grupo;
        invest.NoProductos = prueba[i].NoProductos;
        invest.Publindex = prueba[i].Publindex;
        invest.SJRoJCR = prueba[i].SJRoJCR;
        invest.Nombredeproducto = prueba[i].Nombredeproducto;
        invest.Fuente = prueba[i].Fuente;
        invest.NoSalarios = prueba[i].NoSalarios;
        invest.Valor = prueba[i].Valor;
        invest.GrupLAC = prueba[i].GrupLAC;

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