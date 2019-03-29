const express = require('express');
const http = require('http');
const url = require('url');
const bodyParser = require('body-parser');
//const bodyParser = require('body-parser')

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = low(adapter);

var app = express();
app.set('port', 3000);

db.defaults({taskId: 0, tasks: []})
  .write();


app.use(express.static('./htdocs'))
app.get('/index.html', function (req, res) {
    res.sendFile('/htdocs');
});

app.get('/gettasks', function (req, res) {
    db.get();
    var message = db.value();
    res.send(message);
    res.end();
});



// create application/json parser
var jsonParser = bodyParser.json()


app.post('/savetasklist', jsonParser, function (req, res) {
    
    console.log(req.body);
    console.log(req.body.taskId);
    db.setState(req.body)
      .write();
    console.log('Got POST');
    res.end('Success!')
});


// ------ запуск сервера -------

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Server running on port ' +app.get('port'));
  });
