var express = require('express');
var router = express.Router();

const formation2 = require('../models/formation2');

router.get('/', (req, res) => {
    formation2.find({}, (err, form) => {
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
        let formation = new formation2();
        formation.Convocatoria = prueba[i].Convocatoria;
        formation.ANIOEJECUCION = prueba[i].ANIOEJECUCION;
        formation.Entidadpostulante = prueba[i].Entidadpostulante;
        formation.DepartamentoEntidadpostulante = prueba[i].DepartamentoEntidadpostulante;
        formation.ProgramaCTIGrupo = prueba[i].ProgramaCTIGrupo;
        formation.Centro = prueba[i].Centro;
        formation.NombreGrupo = prueba[i].NombreGrupo;
        formation.SGI = prueba[i].SGI;
        formation.CodColciencias = prueba[i].CodColciencias;
        formation.Facultad = prueba[i].Facultad;
        formation.Programa = prueba[i].Programa;
        formation.AreaOCDE = prueba[i].AreaOCDE;
        formation.TipodeDocumentoIdentificaciondeljoven = prueba[i].TipodeDocumentoIdentificaciondeljoven;
        formation.DocumentoIdentificaciondeljoven = prueba[i].DocumentoIdentificaciondeljoven;
        formation.Nombredeljoven = prueba[i].Nombredeljoven;
        formation.correo = prueba[i].correo;
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