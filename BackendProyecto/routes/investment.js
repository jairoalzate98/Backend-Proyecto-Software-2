var express = require('express');
var router = express.Router();

const Investment = require('../models/investment');

router.get('/', (req, res) => {
    Investment.find({}, (err, inv) => {
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
        invest.CODIGOPROYECTO = prueba[i].CODIGOPROYECTO;
        invest.PROYECTO =prueba[i].PROYECTO;
        invest.FECHAINICIO = compareDate(prueba[i].FECHAINICIO);
        invest.ESTADOPROYECTO = prueba[i].ESTADOPROYECTO;
        invest.FECHAESTADO = compareDate(prueba[i].FECHAESTADO);
        invest.FECHAEJECUCION = compareDate(prueba[i].FECHAEJECUCION);
        invest.ANIOEJECUCION = prueba[i].ANIOEJECUCION;
        invest.TIPOFINANCIACION = prueba[i].TIPOFINANCIACION;
        invest.FACULTAD = prueba[i].FACULTAD;
        invest.PROGRAMA = prueba[i].PROGRAMA;
        invest.AREACONOCIMIENTO = prueba[i].AREACONOCIMIENTO;
        invest.CONVOCATORIA = prueba[i].CONVOCATORIA;
        invest.CODIGOCENTRO = prueba[i].CODIGOCENTRO;
        invest.CENTRO = prueba[i].CENTRO;
        invest.CODIGOGRUPO = prueba[i].CODIGOGRUPO;
        invest.GRUPO = prueba[i].GRUPO;
        invest.AREAOCDE = prueba[i].AREAOCDE;
        invest.SIGLA = prueba[i].SIGLA;
        invest.NOMBRES = prueba[i].NOMBRES;
        invest.IDENTIFICACION = prueba[i].IDENTIFICACION;
        invest.TIPO = prueba[i].TIPO;
        invest.TIPOINVESTIGADOR = prueba[i].TIPOINVESTIGADOR;
        invest.MONTOESPECIEINTERNO = prueba[i].MONTOESPECIEINTERNO;
        invest.MONTOEFECTIVOINTERNO = prueba[i].MONTOEFECTIVOINTERNO;
        invest.MONTOEXTERNO1 = prueba[i].MONTOEXTERNO1;
        invest.ENTIDADEXTERNA1 = prueba[i].ENTIDADEXTERNA1;
        invest.TIPODEENTIDAD = prueba[i].TIPODEENTIDAD;
        invest.MONTOEXTERNO2 = prueba[i].MONTOEXTERNO2;
        invest.ENTIDADEXTERNA2 = prueba[i].ENTIDADEXTERNA2;
        invest.NOTAS = prueba[i].NOTAS;
        invest.COMPROMISO = prueba[i].COMPROMISO;
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

router.post('/getData', (req, res) => {
    var type = req.body.menuId;
    if(type == 'I01'){
        I01(req, res);
    }else if(type == 'I02'){
        I02(req, res);
    }else if(type == 'I03'){
        I03(req, res);
    }
});

async function I01(req, res){
    var faculty = req.body.facultyId;
    var type = req.body.menuId;
    var facu = getFaculty(faculty);
    var years = [2014, 2015, 2016, 2017, 2018];
    var types = ['CAPITAL SEMILLA', 'CONTRAPARTIDA', 'SIN FINANCIACION'];
    let data = [];
    types.forEach(function (elementType) {
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
        });
        data = [];
    });
    await resolveAfter10Seconds(10);
    res.send(data);
}

async function I02(req, res){
    var faculty = req.body.facultyId;
    var type = req.body.menuId;
    var facu = getFaculty(faculty);
    var years = [2014, 2015, 2016, 2017, 2018];
    let data = [];
    let species = 0;
    let cash = 0;
    let external = 0;
    years.forEach(function(element) {
        Investment.find({"FACULTAD": facu, "TABLA": type, ANIOEJECUCION: element}, function (err, inv) {
             if(err){
                 return res.status(500).send("Error al realizar la peticion");
            } 
            if(!inv) {
                  return res.status(404).send("No hay datos");
             }
            for(var i = 0; i < inv.length; i++){
                species += inv[i].MONTOESPECIEINTERNO;
                cash += inv[i].MONTOEFECTIVOINTERNO;
                external += inv[i].MONTOEXTERNO1;
            }
            data.push({'Anio': element, 'Tipo': 'Aporte Especie UPTC', 'Total': species});
            data.push({'Anio': element, 'Tipo': 'Aporte Eefectivo UPTC', 'Total': cash});
            data.push({'Anio': element, 'Tipo': 'Aporte externo', 'Total': external});
            species = 0;
            cash = 0;
            external = 0;
        });
    });
    await resolveAfter10Seconds(10);
    res.send(data);
}

/*
function I03(){
    for(var i = 2014; i < 2019; i ++){
        Investment.find({"FACULTAD": facu, "TABLA": typ, ANIOEJECUCION: i}, (err, inv) => {
            if(err){
                return res.status(500).send("Error al realizar la peticion");
            } 
            if(inv.length == 0) {
                return res.status(404).send("No hay datos");
            }
        });
    }
}
*/
function getFaculty(fac){
    switch(fac){
        case '1':
            return "CIENCIAS";
        case '2':
            return "CIENCIAS AGROPECUARIAS";
        case '3':
            return "CIENCIAS DE LA EDUCACION";
        case '4':
            return "CIENCIAS DE LA SALUD";
        case '5':
            return "CIENCIAS ECONOMICAS Y ADMINISTRATIVAS";
        case '6':
            return "DERECHO Y CIENCIAS  SOCIALES";
        case '7':
            return "ESTUDIOS A DISTANCIA";
        case '8':
            return "INGENIERIA";
        case '9':
            return "SECCIONAL CHIQUINQUIRA";
        case '10':
            return "SECCIONAL DUITAMA";
        case '11':
            return "SECCIONAL SOGAMOSO";
    }
}

function compareDate(str1){
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    return date1;
}



function resolveAfter10Seconds(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(x);
    }, 10000);
});

}

module.exports = router;