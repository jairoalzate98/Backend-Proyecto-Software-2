var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bp1Schema = schema({
    A2012: Number,
    A2013: Number,
    A2014: Number,
    A2015: Number,
    A2016: Number,
    A2017: Number,
    A2018: Number,
    A2019: Number,
    Facultad: String, 
    TABLA: String
});

module.exports = mongoose.model('bibliographicProduction1', bp1Schema);