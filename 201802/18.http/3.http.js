let http = require('http');

let server = http.createServer(function(req,res){
    console.log(1);
});
server.listen(8080);