## 线程
- js线程 ui线程 这两个线程是互斥的，目的就是为了保证不产生冲突
- ui线程会把更改放到队列中 当js线程空闲下来，ui线程在继续渲染

## webworker 多线程 *
- 他和js主线程不是平级的，主线程可以控制webworker,webworker不能操作dom 不能获取document,window


## 栈和队列
- 先进后出 函数调用


## node的特点
- 异步 非阻塞i/o (libuv)


## 同步和异步 && 阻塞非阻塞
- 阻塞非阻塞指的是调用者的状态
- 同步和异步指的是被调用者是如何通知的


## 宏任务
- setTimeout setInterval (setImmediate)


## 微任务
Promise.then，then方法不应该放到宏任务中,默认浏览器的实现放到了微任务中，MutationObserve不兼容的, MessageChannel微任务(vue中nextTick实现原理)

> 同步代码先执行 执行是在栈中执行的，微任务会先执行，在执行宏任务，

```
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
```

> 先默认走栈 console.log(1); 先走第一个setTimeout，将微任务放到队列中，执行微任务，微任务执行完再走宏任务 (浏览器过程)

