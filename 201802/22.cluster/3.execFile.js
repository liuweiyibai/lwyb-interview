// let {execFile} = require('child_process');
// spawn  execFile异步的 
// execFile('ls',['-l'],function(err,stdout,stderr){
//     // 它的结果会被缓存 等待结束后一起输出 200
//     console.log(stdout)
// })
let {exec} = require('child_process');
// exec('ls -l',function(err,stdout,stderr){
//     // 它的结果会被缓存 等待结束后一起输出 200
//     console.log(stdout)
// });

// exec('start http://localhost:3000');