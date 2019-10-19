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
    let fac = req.body.facultyId;
    let typ = req.body.menuId;
    let facu = getFaculty(fac);
    Investment.find({"FACULTAD": facu, "TABLA": typ}, (err, inv) => {
        if(err){
            return res.status(500).send("Error al realizar la peticion");
        } 
        if(!inv) {
            return res.status(404).send("No hay datos");
        }
        if(typ == 'I01'){
            makeReport(inv, res);
        }else if(typ == 'I02'){
            makeReport2(inv, res);
        }
    });
});

function makeReport2(inv, res){
    var mesi2014 = 0;
    var mefi2014 = 0;
    var mex2014 = 0;
    var mesi2015 = 0;
    var mefi2015 = 0;
    var mex2015 = 0;
    var mesi2016 = 0;
    var mefi2016 = 0;
    var mex2016 = 0;
    var mesi2017 = 0;
    var mefi2017 = 0;
    var mex2017 = 0;
    var mesi2018 = 0;
    var mefi2018 = 0;
    var mex2018 = 0;
    for(var i = 0; i < inv.length; i++){
        if(inv[i].ANIOEJECUCION == 2014){
            mesi2014 += inv[i].MONTOESPECIEINTERNO;
            mefi2014 += inv[i].MONTOEFECTIVOINTERNO;
            mex2014 += inv[i].MONTOEXTERNO1;
        }else if(inv[i].ANIOEJECUCION == 2015){
            mesi2015 += inv[i].MONTOESPECIEINTERNO;
            mefi2015 += inv[i].MONTOEFECTIVOINTERNO;
            mex2015 += inv[i].MONTOEXTERNO1;
        }else if(inv[i].ANIOEJECUCION == 2016){
            mesi2016 += inv[i].MONTOESPECIEINTERNO;
            mefi2016 += inv[i].MONTOEFECTIVOINTERNO;
            mex2016 += inv[i].MONTOEXTERNO1;
        }else if(inv[i].ANIOEJECUCION == 2017){
            mesi2017 += inv[i].MONTOESPECIEINTERNO;
            mefi2017 += inv[i].MONTOEFECTIVOINTERNO;
            mex2017 += inv[i].MONTOEXTERNO1;
        }else if(inv[i].ANIOEJECUCION == 2018){
            mesi2018 += inv[i].MONTOESPECIEINTERNO;
            mefi2018 += inv[i].MONTOEFECTIVOINTERNO;
            mex2018 += inv[i].MONTOEXTERNO1;
        }
    }
    res.send([{'anio': '2014', 'tipo': 'MONTO ESPECIE INTERNO', 'Total': mesi2014},
             {'anio': '2014', 'tipo': 'MONTO EFECTIVO INTERNO', 'Total': mefi2014},
             {'anio': '2014', 'tipo': 'MONTO EXTERNO', 'Total': mex2014},
             {'anio': '2015', 'tipo': 'MONTO ESPECIE INTERNO', 'Total': mesi2015},
             {'anio': '2015', 'tipo': 'MONTO EFECTIVO INTERNO', 'Total': mefi2015},
             {'anio': '2015', 'tipo': 'MONTO EXTERNO', 'Total': mex2015},
             {'anio': '2016', 'tipo': 'MONTO ESPECIE INTERNO', 'Total': mesi2016},
             {'anio': '2016', 'tipo': 'MONTO EFECTIVO INTERNO', 'Total': mefi2016},
             {'anio': '2016', 'tipo': 'MONTO EXTERNO', 'Total': mex2016},
             {'anio': '2017', 'tipo': 'MONTO ESPECIE INTERNO', 'Total': mesi2017},
             {'anio': '2017', 'tipo': 'MONTO EFECTIVO INTERNO', 'Total': mefi2017},
             {'anio': '2017', 'tipo': 'MONTO EXTERNO', 'Total': mex2017},
             {'anio': '2018', 'tipo': 'MONTO ESPECIE INTERNO', 'Total': mesi2018},
             {'anio': '2018', 'tipo': 'MONTO EFECTIVO INTERNO', 'Total': mefi2018},
             {'anio': '2018', 'tipo': 'MONTO EXTERNO', 'Total': mex2018}
             ])
}

function makeReport(inv, res){
    var capSem2014 = 0;
    var capSem2015 = 0;
    var capSem2016 = 0;
    var capSem2017 = 0;
    var capSem2018 = 0;
    var cont2018 = 0;
    var cont2017 = 0;
    var cont2016 = 0;
    var cont2015 = 0; 
    var cont2014 = 0;
    var sinfin2014 = 0;
    var sinfin2015 = 0;
    var sinfin2016 = 0;
    var sinfin2017 = 0;
    var sinfin2018 = 0;
    for(var i = 0; i < inv.length; i++){
        if(inv[i].ANIOEJECUCION == 2014 && inv[i].TIPOFINANCIACION == 'CAPITAL SEMILLA'){
            capSem2014++;
        }else if(inv[i].ANIOEJECUCION == 2015 && inv[i].TIPOFINANCIACION == 'CAPITAL SEMILLA'){
            capSem2015++;
        }else if(inv[i].ANIOEJECUCION == 2016 && inv[i].TIPOFINANCIACION == 'CAPITAL SEMILLA'){
            capSem2016++;
        }else if(inv[i].ANIOEJECUCION == 2017 && inv[i].TIPOFINANCIACION == 'CAPITAL SEMILLA'){
            capSem2017++;
        }else if(inv[i].ANIOEJECUCION == 2018 && inv[i].TIPOFINANCIACION == 'CAPITAL SEMILLA'){
            capSem2018++;
        }else if(inv[i].ANIOEJECUCION == 2018 && inv[i].TIPOFINANCIACION == 'CONTRAPARTIDA'){
            cont2018++;
        }else if(inv[i].ANIOEJECUCION == 2017 && inv[i].TIPOFINANCIACION == 'CONTRAPARTIDA'){
            cont2017++;
        }else if(inv[i].ANIOEJECUCION == 2016 && inv[i].TIPOFINANCIACION == 'CONTRAPARTIDA'){
            cont2016++;
        }else if(inv[i].ANIOEJECUCION == 2015 && inv[i].TIPOFINANCIACION == 'CONTRAPARTIDA'){
            cont2015++;
        }else if(inv[i].ANIOEJECUCION == 2014 && inv[i].TIPOFINANCIACION == 'CONTRAPARTIDA'){
            cont2014++;
        }else if(inv[i].ANIOEJECUCION == 2014 && inv[i].TIPOFINANCIACION == 'SIN FINANCIACION'){
            sinfin2014++;
        }else if(inv[i].ANIOEJECUCION == 2015 && inv[i].TIPOFINANCIACION == 'SIN FINANCIACION'){
            sinfin2015++;
        }else if(inv[i].ANIOEJECUCION == 2016 && inv[i].TIPOFINANCIACION == 'SIN FINANCIACION'){
            sinfin2016++;
        }else if(inv[i].ANIOEJECUCION == 2017 && inv[i].TIPOFINANCIACION == 'SIN FINANCIACION'){
            sinfin2017++;
        }else if(inv[i].ANIOEJECUCION == 2018 && inv[i].TIPOFINANCIACION == 'SIN FINANCIACION'){
            sinfin2018++;
        }
    }
    res.send([{'anio': '2014', 'tipo': 'Sin Financiacion', 'Total': sinfin2014},
             {'anio': '2015', 'tipo': 'Sin Financiacion', 'Total': sinfin2015},
             {'anio': '2016', 'tipo': 'Sin Financiacion', 'Total': sinfin2016},
             {'anio': '2017', 'tipo': 'Sin Financiacion', 'Total': sinfin2017},
             {'anio': '2018', 'tipo': 'Sin Financiacion', 'Total': sinfin2018},
             {'anio': '2014', 'tipo': 'Contrapartida', 'Total': cont2014},
             {'anio': '2015', 'tipo': 'Contrapartida', 'Total': cont2015},
             {'anio': '2016', 'tipo': 'Contrapartida', 'Total': cont2016},
             {'anio': '2017', 'tipo': 'Contrapartida', 'Total': cont2017},
             {'anio': '2018', 'tipo': 'Contrapartida', 'Total': cont2018},
             {'anio': '2014', 'tipo': 'Capital Semilla', 'Total': capSem2014},
             {'anio': '2015', 'tipo': 'Capital Semilla', 'Total': capSem2015},
             {'anio': '2016', 'tipo': 'Capital Semilla', 'Total': capSem2016},
             {'anio': '2017', 'tipo': 'Capital Semilla', 'Total': capSem2017},
             {'anio': '2018', 'tipo': 'Capital Semilla', 'Total': capSem2018}
             ])
}

function getFaculty(fac){
    switch(fac){
        case 1:
            return "CIENCIAS";
        case 2:
            return "CIENCIAS AGROPECUARIAS";
        case 3:
            return "CIENCIAS DE LA EDUCACION";
        case 4:
            return "CIENCIAS DE LA SALUD";
        case 5:
            return "CIENCIAS ECONOMICAS Y ADMINISTRATIVAS";
        case 6:
            return "DERECHO Y CIENCIAS  SOCIALES";
        case 7:
            return "ESTUDIOS A DISTANCIA";
        case 8:
            return "INGENIERIA";
        case 9:
            return "SECCIONAL CHIQUINQUIRA";
        case 10:
            return "SECCIONAL DUITAMA";
        case 11:
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

module.exports = router;