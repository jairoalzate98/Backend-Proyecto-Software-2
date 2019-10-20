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

module.exports = router;