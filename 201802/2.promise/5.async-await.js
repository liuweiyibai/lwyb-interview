let bluebird = require('bluebird');
let fs = require('fs');
let read = bluebird.promisify(fs.readFile);

// 用async 来修饰函数，aysnc需要配await,await只能promise
// async和await(语法糖)  === co + generator
async function r(){
    try{
        let content1 = await read('./2.promise/100.txt','utf8');
        let content2 = await read(content1,'utf8');
        return content2;
    }catch(e){ // 如果出错会catch
        console.log('err',e)
    }
}
// async函数返回的是promise,
r().then(function(data){
    console.log('flag',data);
},function(err){

})
// async / await 解决的问题有哪些
// 1.回调地狱
// 2.并发执行异步，在同一时刻同步返回结果 Promise.all
// 3.解决了返回值的问题
// 4.可以实现代码的try/catch;



console.log(1);

setTimeout(function(){
    console.log(2);
    Promise.resolve(1).then(function(){
        console.log('promise')
    })
})
setTimeout(function(){
    console.log(3);
})