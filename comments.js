// Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up port
app.set('port', 3000);

// Set up static paths
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  res.json(req.body);
});

// Start web server
app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});