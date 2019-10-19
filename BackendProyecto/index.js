var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

const port = process.env.PORT || 3001;
const investmentRouter = require('./routes/investment');
const investment4Ruter = require('./routes/investment4');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use('/investment4', investment4Ruter);