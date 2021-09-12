// 需要下载 npm install q

let Promise = require('./Promise.js');
function read(url) {
    return new Promise(function (resolve, reject) {
        require('fs').readFile(url, 'utf8', function (err, data) {
            if (err) reject(err);
            resolve(data);
        })
    })
}
let Q = require('q');
Q.all([read('./2.promise/1.txt'), read('./2.promise/2.txt')]).then(function ([a1, a2]) {
    console.log(a1, a2)
});
// 同 Promise.all
Q.fcall(function () {
    return 100;
}).then(function (data) {
    console.log(data);
})
// defer
let Q = require('q');
function read(url) {
    let defer = Q.defer();
    require('fs').readFile(url, 'utf8', function (err, data) {
        if (err) defer.reject(err);
        defer.resolve(data);
    })
    return defer.promise
}
read('./2.promise/1.txt').then(function (data) {
    console.log(data);
});


// blueBird
// npm install bluebird
let fs = require('fs');
let bluebird = require('bluebird');
function promisify(fn) { // promise化 将回调函数在内部进行处理
    return function (...args) {
        return new Promise(function (resolve, reject) {
            fn(...args, function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}
function promisifyAll(obj) {
    Object.keys(obj).forEach(key => { // es5将对象转化成数组的方法
        if (typeof obj[key] === 'function') {
            obj[key + 'Async'] = promisify(obj[key])
        }
    })
}
promisifyAll(fs); // 将所有的方法全部增加一个promise化
fs.readFileAsync('./2.promise/1.txt', 'utf8').then(function (data) {
    console.log(data);
});

