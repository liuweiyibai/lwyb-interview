let EventEmitter = require('events');
let util = require('util');
function Girl(){

}
util.inherits(Girl,EventEmitter);

let girl = new Girl();
// 当绑定新的事件时 会触发这个函数
// girl.on('newListener',function(eventName,callback){
//     console.log(eventName)
// });
function findnewBoy(data){
    console.log(data)
}
girl.once('失恋',findnewBoy);// on绑定的方法不会马上执行，只有当emit时才会执行
// once表示只绑定一次，触发一次，触发后不在触发

// 没发生之前可以移除监听
girl.removeListener('失恋',findnewBoy)

console.log(EventEmitter.defaultMaxListeners); // 默认情况下 默认能绑定10个方法，超过了会报内存泄漏异常

girl.setMaxListeners(3); // 最多能绑定三个 
console.log(girl.getMaxListeners())
girl.once('失恋',findnewBoy);
girl.once('失恋',findnewBoy);
girl.once('失恋',findnewBoy);
girl.once('失恋',findnewBoy);
console.log(girl.eventNames());
girl.prependOnceListener('失恋',function(){
    console.log('hello')
})
girl.emit('失恋','newBoy');
girl.emit('失恋','newBoy');

