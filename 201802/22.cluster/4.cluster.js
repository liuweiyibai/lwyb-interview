// 集群 很多个
let cluster = require('cluster');
let http = require('http')
let cpus  = require('os').cpus().length;
// 根据cpu的核数 创建对用的进程
// 可以通过ipc的方式进行进程之间的通信，默认不支持管道的方式
if(cluster.isMaster){
    cluster.setupMaster({
        stdio:'pipe'
    })
    // 在主分支中可以 创建子进程
    for(let i = 0;i<cpus;i++){
        cluster.fork();
    }
}else{
    http.createServer(function(req,res){
        res.end('ok'+process.pid);
    }).listen(3000);
}
// cluster.on('disconnect',function(){
//     console.log('断开连接')
// })
// cluster.on('fork',function(worker){
    
// });
// cluster.on('exit',function(){
//     console.log('exit')
// })
