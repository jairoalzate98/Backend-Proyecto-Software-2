var express = require('express');
var router = express.Router();

const pb1 = require('../models/bibliographicProduction1');

router.get('/', (req, res) => {
    pb1.find({}, (err, pb) => {
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
        let pb = new pb1();
        pb.A2012 = prueba[i].A2012;
        pb.A2013 = prueba[i].A2013;
        pb.A2014 = prueba[i].A2014;
        pb.A2015 = prueba[i].A2015;
        pb.A2016 = prueba[i].A2016;
        pb.A2017 = prueba[i].A2017;
        pb.A2018 = prueba[i].A2018;
        pb.A2019 = prueba[i].A2019;
        pb.Facultad = prueba[i].Facultad;
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

module.exports = router;