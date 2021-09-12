// node实现子集成有一个自带的模块  child_process
// 可以创建一个进程为我们服务，不会影响当前node的事件环
// 多进程
// 多核cpu 如果再node只开一个进程 只会占用1个cpu

// 集群
// let os = require('os').cpus();
// console.log(os.length);

// 如何创建一个子进程 复杂再进程之间通信
// node不适合 cpu密集

// spawn 生产  fork 叉子  exec 执行  execFile 执行文件
let {spawn} = require('child_process');
let path = require('path');
// process.cwd()
let child = spawn('node',['1.test.js','a','b','c'],{
    cwd:path.join(__dirname,'pro')
});

//如果不写stdio 默认是管道类型
child.stderr.on('data',function(data){
    console.log(data.toString());
});

// 主进程里面有三个东西
// process.stdin  0 
// process.stdout 1
// process.stderr 2

// ---------------------
child.on('exit',function(){
    console.log('exit')
});
child.on('close',function(){
    console.log('close')
})
child.on('error',function(err){
    console.log('发生错误')
});


// 建立三个进程 第一个进程负责 创建两个进程 
//将第一个进程中的参数 传入第二个进程中去，再第二个进程中写入到文件里