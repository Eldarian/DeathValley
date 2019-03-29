const express = require('express');
const http = require('http');
const url = require('url');
//const bodyParser = require('body-parser')

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = low(adapter);

var app = express();
app.set('port', 3000);

// app.use(express.bodyParser()) {
//   if (req.method === 'GET') {
//     if (req.get('Content-Type')=='fulltext')
//     res.send(db.value());
//   }
// }
// var options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders: function (res, path, stat) {
//       res.set('x-timestamp', Date.now())
//     }
//   }

//console.log(db.value());
  
app.use(express.static('./'))
app.get('/index.html', function (req, res) {
    res.sendFile('/index.html');
});

app.get('/gettasks', function (req, res) {
    db.get();
    var message = db.value();
    res.send(message);
});
app.post('/savetasklist', function (req, res) {
    console.log(req.body);
    res.send('saving in process');
    console.log('Got POST');
});


// ------ запуск сервера -------

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Server running on port ' +app.get('port'));
  });
