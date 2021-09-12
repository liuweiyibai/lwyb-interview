let fs = require('fs');
let path = require('path');
let EventEmitter = require('events');// 订阅  发布
let events = new EventEmitter();
let arr = [];
events.on('getData',function(d){ // 绑定的功能
    arr.push(d);
    if(arr.length === 2){
        console.log(arr);
    }
})
fs.readFile(path.join(__dirname,'1.txt'),'utf8',function(err,data){
    events.emit('getData',data)
})
fs.readFile(path.join(__dirname,'2.txt'),'utf8',function(err,data){
    events.emit('getData',data)
});
//  node中 http stream 都会继承这个模块

//Promise.all 高阶函数 after  / 发布订阅