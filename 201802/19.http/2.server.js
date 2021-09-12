let http = require('http');

let server = http.createServer(function(req,res){
    let contentType = req.headers['content-type'];
    let buffers = [];
    req.on('data',function(chunk){
        buffers.push(chunk);
    });
    req.on('end',function(){
        let content = Buffer.concat(buffers).toString();
        if(contentType === 'application/json'){
            console.log(JSON.parse(content).name)
        }else if(contentType === 'application/x-www-form-urlencoded'){
            let queryString = require('querystring');
            console.log(queryString.parse(content).name)
        }
        res.end('hello');
    });
});

server.listen(4000);