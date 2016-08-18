var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

app.use('/', routes);

app.listen(3000);
console.log('server listening')

module.exports = app;
