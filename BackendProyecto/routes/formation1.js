var express = require('express');
var router = express.Router();

const formation1 = require('../models/formation1');

router.get('/', (req, res) => {
    formation1.find({}, (err, form) => {
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
        let formation = new formation1();
        formation.Entidad = prueba[i].Entidad;
        formation.Nombre = prueba[i].Nombre;
        formation.Grupo = prueba[i].Grupo;
        formation.CodigoCOL = prueba[i].CodigoCOL;
        formation.SGI = prueba[i].SGI;
        formation.Centro = prueba[i].Centro;
        formation.Facultad = prueba[i].Facultad;
        formation.Programa = prueba[i].Programa;
        formation.Anio = prueba[i].Anio;
        formation.Correo = prueba[i].Correo;
        formation.Tutor = prueba[i].Tutor;
        formation.Observaciones = prueba[i].Observaciones;
        formation.Celular = prueba[i].Celular;
        formation.Categoria693_2014 = prueba[i].Categoria693_2014;
        formation.Categoria737_2015 = prueba[i].Categoria737_2015;
        formation.Categoria781_2017 = prueba[i].Categoria781_2017;
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