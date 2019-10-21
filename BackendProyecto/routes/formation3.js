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

router.post('/getData', (req, res) => {
    sendData(req, res);
});

async function sendData(req, res){
    var faculty = req.body.facultyId;
    var type = req.body.menuId;
    var facu = getFaculty(faculty);
    var years = [2014, 2015, 2016, 2017, 2018];
    let data = [];
    years.forEach(function(element) {
        Investment.find({"FACULTAD": facu, "TABLA": type, ANIOEJECUCION: element,TIPOFINANCIACION: elementType}, function (err, inv) {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                return res.status(404).send("No hay datos");
            }
            data.push({'Anio': element, 'Tipo': elementType, 'Total': inv.length/2});
        });
        data = [];
    });
    await resolveAfter10Seconds(10);
    res.send(data);
}

module.exports = router;