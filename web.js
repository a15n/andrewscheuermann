'use strict';

// web.js
var express = require('express');
var logfmt = require('logfmt');
var app = express();

// make the files public
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

app.use(logfmt.requestLogger());

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/mobile.html', function(req, res){
  res.sendfile('mobile.html');
});

app.get('*', function(req, res){
  res.sendfile('404.html');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});