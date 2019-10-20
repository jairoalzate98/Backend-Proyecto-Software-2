var express = require('express');
var router = express.Router();

const pb3 = require('../models/bibliographicProduction3');

router.get('/', (req, res) => {
    pb3.find({}, (err, pb) => {
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
        let pb = new pb3();
        pb.ID = prueba[i].ID;
        pb.NOMBRELIBRO = prueba[i].NOMBRELIBRO;
        pb.AUTORES = prueba[i].AUTORES;
        pb.RESENIA = prueba[i].RESENIA;
        pb.ISBN = prueba[i].ISBN;
        pb.FACULTAD = prueba[i].FACULTAD;
        pb.FACULTAD2 = prueba[i].FACULTAD2;
        pb.COLECCIÓN = prueba[i].COLECCIÓN;
        pb.ANIOPUBLICACION = prueba[i].ANIOPUBLICACION;
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