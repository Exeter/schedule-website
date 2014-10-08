var express = require('express'),
    fs = require('fs'),
    url = require('url');

var app = express();

app.use('/bower_components', express.static('bower_components'));
app.use('/', express.static('.'));

app.listen(process.env.PORT, function() {
  console.log('Listening on port', process.env.PORT);
});
