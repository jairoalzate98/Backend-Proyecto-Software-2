var express = require('express');
var router = express.Router();

const capacity2_1 = require('../models/capacity2_1');

router.get('/', (req, res) => {
    capacity2_1.find({}, (err, cap) => {
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
        let capacity = new capacity2_1();
        capacity.Identificacion = prueba[i].Identificacion;
        capacity.Nombres = prueba[i].Nombres;
        capacity.Facultad = prueba[i].Facultad;
        capacity.ProgramaAcademico = prueba[i].ProgramaAcademico;
        capacity.Vinculacion = prueba[i].Vinculacion;
        capacity.Vinculacion2 = prueba[i].Vinculacion2;
        capacity.NivelEstudios = prueba[i].NivelEstudios;
        capacity.Anio = prueba[i].Anio;
        capacity.PeriodoAcademico = prueba[i].PeriodoAcademico;
        capacity.Genero = prueba[i].Genero;
        capacity.Edad = prueba[i].Edad;
        capacity.TipoInvestigadorColciencias781_017 = prueba[i].TipoInvestigadorColciencias781_017;
        capacity.Columna1 = prueba[i].Columna1;
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