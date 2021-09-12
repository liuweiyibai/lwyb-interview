let net = require('net');
let server = net.createServer(function(socket){

});
let port = 8080;
server.listen(port,'localhost',function(){
    console.log(`server start ${port}`)
})