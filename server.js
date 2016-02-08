var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 8383;


var server = http.createServer(app).listen(port, function(){
  console.log('server is ready %d', this.address().port);
  //websockets(this)
});
console.log("http server listening on %d", port)

//app.use(express.static(__dirname + '/public'));


var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
  }, 100);
  console.log('started client interval');
  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  });
});