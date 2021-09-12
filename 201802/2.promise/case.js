//let Promise = require('./Promise');
let p = new Promise(function (resolve, reject) {
    resolve('zfpx')
});
p.then(function (data) {
    return {then:1}
}, function (err) {
    throw new Error('失败');
}).then(function (data) {
    console.log(data)
}, function (err) {
    console.log('flag', err)
})

//1.promise实例可以多次then,当成功后会将then中的成功方法按顺序执行，我们可以先将then中的成功的回调和失败的回调存到数组内，当成功时调用成功的数组即可

//2.链式调用 jquery,jquery能实现链式调用靠的就是返回this,promise不能返回this,promise实现链式调用靠的是返回一个新的promise
// let p = new Promise(function(resolve,reject){
//     resolve();
// })
// let p2 = p.then(function(){
//     throw new Error('错误');
// })
// p2.then(function(){
// },function(err){
//     console.log(err);
// })

//3.如果then中无论是成功的回调还是失败的回调只要返回了结果就会走下一个then中的成功，如果有错误走下一个then的失败

//4.如果第一个promise返回一个普通值,会进到下一次then的成功的回调,如果第一个promise返回了一个promise，需要等待返回的promise执行后的结果传递给下一次then中


//5.resolvePromise
// 返回的结果和promise是同一个那么永远不会成功和失败
var p = new Promise(function (resolve, reject) {
    resolve()
})
p.then(function () {
    return
}, function (err) {
    console.log(err)
}).then(function (data) {
    console.log(data);
})

//6.判断x是不是promise，如果x是对象并且x的then方法是函数我们就认为他是一个promise
let promise = {}
Object.defineProperty(promise, 'then', {
    get(){
        throw Error();
    }
})
promise.then


//7.有些人写的promise可能会既调用成功 又调用失败，如果两个都调用先调用谁另一个就忽略掉


// 8.我们的代码可以在then中什么都不传
// promise中值的穿透
promise.then().then().then(function (data) {
    console.log(data);
}, function () {

})

//9.promise规范中要求，所有的onFufiled和onRjected都需要异步执行,setTimeout

let a = 100;
//setTimeout(function(){
a = 200
//})
console.log(a)



let Promise = require('./Promise');
function read() {
    let defer = Promise.defer()
    require('fs').readFile('./2.promise/1.txt', 'utf8', function (err, data) {
        if(err) defer.reject(err);
        defer.resolve(data);
    })
    return defer.promise;
}
read().then(function (data) {
    console.log(data)
},function(err){
    console.log(err);
})


// 下载一个Promise的测试库,promises-aplus-tests,
// npm install -g promises-aplus-tests

// promises-aplus-tests 文件名


let Promise = require('./Promise');
let p = new Promise(function(resolve,reject){
    reject('错误');
})  
p.then(()=>{

}).catch(e=>{
    console.log(e);
})




// --------------------------------all


let Promise = require('./Promise');
function read(url) {
    return new Promise(function(resolve,reject){
        require('fs').readFile(url, 'utf8', function (err, data) {
            if(err) reject(err);
           resolve(data);
        })
    })
}
Promise.race([read('./2.promise/1.txt'),read('./2.promise/2.txt')]).then(function(data){
    console.log(data)
})