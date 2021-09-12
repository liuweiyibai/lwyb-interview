let http = require('http');

for(var i = 0;i<10;i++){
    http.get({
        hostname:'localhost',
        port:3000,
        path:'/',
        method:'GET'
    },function(res){
        res.on('data',function(data){
            console.log(data.toString())
        })
    })
}