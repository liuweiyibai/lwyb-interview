console.log(1);
console.log(2);
setTimeout(function(){
    console.log(3)
    setTimeout(function(){
        console.log(6);
    })
},0)
setTimeout(function(){
    console.log(4);
    setTimeout(function(){
        console.log(7);
    })
},0)
console.log(5)

// 当触发回调函数时 会将回调函数放到队列中
setTimeout(function(){
    console.log('setTimeout')
},4)
for(var i = 0;i<10000000;i++){
    console.log(i)
}