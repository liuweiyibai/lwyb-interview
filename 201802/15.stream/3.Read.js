let {Readable} = require('stream');

// 想实现什么流 就继承这个流
// Readable里面有一个read()方法，默认掉_read()
// Readable中提供了一个push方法你调用push方法就会触发data事件
let index = 9;
class MyRead extends Readable{
    _read(){
        // 可读流什么时候停止呢？ 当push null的时候停止
        if(index-->0)return this.push('123');
        this.push(null);
    }
}
let mr = new MyRead;
mr.on('data',function(data){
    console.log(data);
});