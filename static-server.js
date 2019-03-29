// var http = require('http');
// var static = require('node-static');
// var file = new static.Server('.');

// http.createServer(function(req, res) {
//   file.serve(req, res);
// }).listen(8080);

// console.log('Server running on port 8080');



var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

const low = require('lowdb');
// const express = require('express');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// var app = express();
// app.set('port', 8080);

// app.use(function(req, res, next) {
//   if (req.method === 'GET') {
//     if (req.get('Content-Type')=='fulltext')
//     res.send(db.value());
//   }

// });
// app.use(function(req, res, next) {
//   if (req.method === 'POST') {
//     var a = req.body;
//  }
// });

// app.use(function(req, res) {

// })


// // Set some defaults (required if your JSON file is empty)
// db.defaults({ tasks: [], taskId: 0 })
//   .write();

// // Add a post
// db.get('tasks')
//   .push({ id: 1, name: 'Create DataBase', description: 'Create a Database', isDone: true, priority: 1, creationDate: '28 Mar 2019 11:47'})
//   .write()

// // Set a user using Lodash shorthand syntax
// db.set('tasks[0].name', 'DataBase creation')
//   .write()
  
// // Increment count
// db.update('taskId', n => n + 1)
//   .write()
//   db.value()

// For performance, use .value() instead of .write() if you're only reading from db
// db.get('posts')
//   .find({ id: 1 })
//   .value()

function accept(req, res) {

  if (req.url == '/data.json') {
    setTimeout(function() {
      file.serve(req, res);
    }, 2000);
  } else {
    file.serve(req, res);
  }
  
}

// ------ запустить сервер -------

  // http.createServer(app).listen(app.get('port'), function(){
  //   console.log('Server running on port ' +app.get('port'));
  // });



if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
console.log('Server running on port 8080');