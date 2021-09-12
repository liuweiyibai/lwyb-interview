// 执行上下文栈 作用域
function one(){
    let a = 1;
    two();
    function two(){
        let b = 2;
        three();
        function three(){
            console.log(b)
        }
    }
}
one();

// 队列 [1,2,3,4,5,6]



console.log(1)
setTimeout(function(){
    console.log()
},0)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
console.log(2)