var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

const port = process.env.PORT || 3001;
const investmentRouter = require('./routes/investment');
const investment4Router = require('./routes/investment4');
const investment5Router = require('./routes/investment5');
const investment6Router = require('./routes/investment6');
const formation1Router = require('./routes/formation1');
const formation2Router = require('./routes/formation2');
const formation3Router = require('./routes/formation3');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

mongoose.connect('mongodb://localhost:27017/proyecto', {useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log(`Error en la conexion a la base de datos: ${err}`); 
    }
    console.log('Conexion a la base de datos establecida');
    app.listen(port, () => {    
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
});

app.use('/investment', investmentRouter);
app.use('/investment4', investment4Router);
app.use('/investment5', investment5Router);
app.use('/investment6', investment6Router);
app.use('/formation1', formation1Router);
app.use('/formation2', formation2Router);
app.use('/formation3', formation3Router);