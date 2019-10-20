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

module.exports = router;