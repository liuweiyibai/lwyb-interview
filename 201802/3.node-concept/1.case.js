let Promise = require('./1.js');
let p = new Promise(function(resolve,reject){
    resolve();
}) 
// 不能自己等待自己完成
var p1 = p.then(function(){
    return p1; // p1永远不能完成
})

p1.then(function(){},function(err){
    console.log(err);
})


// onFufiled和onRejcted 不传要给默认函数

// var p1 = p.then().then().then();

let Promise = require('./1.js')
let promise = new Promise(function(resolve,reject){
    resolve(new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(new Promise(function(resolve,reject){
                resolve(100)
            }))
        },1000)
    }))
}).then(function(data){
    console.log(data);
})