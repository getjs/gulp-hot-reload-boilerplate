var express = require('express')
var path = require('path')
var api = require('./api')

var app = express()

app.get('/test', function(req, res) {
  res.send('Hello, Hot Reload!')
})

app.get('/api', api)

app.use('/', express.static(path.join(__dirname, 'static')))

var server = app.listen(1337, '127.0.0.1', function () {
  var port = server.address().port
  var host = server.address().address
  console.log('Application started at http://' + host + ':' + port)
})

module.exports = app
