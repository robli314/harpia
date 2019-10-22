var JL = require('jsnlog').JL;
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;

var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var app = express();

// In this example, static files to be sent to the client (such as jsnlog.js) live in the public directory.
app.use(serveStatic('public'));

// Log message directly from the server, to show you can log both from the client and from the server.
JL().info('log message from server');

var cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// -------------------------------
// Receive and process log messages from the client

// parse application/json.
// Log messages from the client use POST and have a JSON object in the body.
// Ensure that those objects get parsed correctly.
app.use(bodyParser.json());

// jsnlog.js on the client by default sends log messages to jsnlog.logger, using POST.
app.post('*.logger', function(req, res) {
  // Process incoming log messages, by handing to the server side jsnlog.
  // JL is the object that you got at
  // var JL = require('jsnlog').JL;
  jsnlog_nodejs(JL, req.body);

  // Send empty response. This is ok, because client side jsnlog does not use response from server.
  res.send('');
});

// -------------------------------

// Start listening for web requests on port 8080
app.listen(8080);
