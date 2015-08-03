'use strict';
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic('public');
var minimist = require('minimist');

var argv = minimist(process.argv);

var users = {};
var tweets;
var server = http.createServer(function(req, res) {

  if (req.url === '/data') {
    if (req.method === 'GET') {
      console.log('Se recibió una solicitud GET del cliente.');
      tweets = [];
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      // por cada user en users, si es distinto a req.headers.user,
      // entonces recorrer su array de tweets ->
      // por cada tweet, preguntar si su propiedad timestamp es mayor
      // a req.headers.timestamp, si lo es entonces agregar el tweet
      // en cuestión al array tweets

      // responder el contenido de tweets transformado a string
      return;
    }
  }

  var tweet;

  if (req.url === '/tweet') {
    if (req.method === 'POST') {
      console.log('Se recibió una solicitud POST del cliente.');
      tweet = '';
      req.setEncoding('utf8');

      req.on('data', function(data) {
        tweet += data;
      });

      req.on('end', function() {
        tweet = JSON.parse(tweet);
        tweet.timestamp = req.headers.timestamp;
        tweet.user = {
          name: req.headers.user
        };
        if (users[req.headers.user]) {
          users[req.headers.user].push(tweet);
        } else {
          users[req.headers.user] = [tweet];
        }

        res.writeHead(200);
        res.end('{}');
      });
      return;
    }
  }

  // parte dónde sirvo contenido estático
  serve(req, res, function() {
    res.end();
  });
});

var port = argv.port || process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 8000;

server.listen(port, argv.ip || process.env.OPENSHIFT_NODEJS_IP, function() {
  console.log('Server is now listening at port: ' + port);
});