# 事件循环相关

## 相关概念

### 线程

- js 线程 ui 线程 这两个线程是互斥的，目的就是为了保证不产生冲突
- ui 线程会把更改放到队列中 当 js 线程空闲下来，ui 线程在继续渲染

### webworker 多线程

- 他和 js 主线程不是平级的，主线程可以控制 webworker,webworker 不能操作 dom 不能获取 document,window

### 栈和队列

- 先进后出 函数调用

### node 的特点

- 异步 非阻塞 i/o (libuv)

### 同步和异步 && 阻塞非阻塞

- 阻塞非阻塞指的是调用者的状态
- 同步和异步指的是被调用者是如何通知的

### 宏任务

- setTimeout setInterval (setImmediate)

### 微任务

Promise.then，then 方法不应该放到宏任务中,默认浏览器的实现放到了微任务中，MutationObserve 不兼容的, MessageChannel 微任务(vue 中 nextTick 实现原理)

> 同步代码先执行 执行是在栈中执行的，微任务会先执行，在执行宏任务，

```js
console.log(1);
setTimeout(function () {
  console.log(2);
  Promise.resolve(1).then(function () {
    console.log('promise');
  });
});
setTimeout(function () {
  console.log(3);
});
```

> 先默认走栈 console.log(1); 先走第一个 setTimeout，将微任务放到队列中，执行微任务，微任务执行完再走宏任务 (浏览器过程)

JavaScript 是单线程执行，通过事件循环执行异步任务。

## 面试题

1. JavaScript 是单线程还是多线程的

   单线程，因为 dom 操作或者事件绑定，只能同时做一件事，但是单线程会导致任务会等待执行，所以引入了浏览器的事件循环机制。

2. 什么是事件循环机制

   因为 JavaScript 是单线程，所以为了保证 JavaScript 代码执行时不会阻塞住，所以会引入了事件循环机制，事件循环机制即将一些任务放到异步任务队列，等到异步任务完成后再将其函数或者回到放到同步任务队列等待执行。JavaScript 主线程不断的循环往复的从任务队列中读取任务，执行任务，这种运行机制称为事件循环（event loop）。

   JavaScript 有一个基于事件循环的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。

3. 什么是微任务、宏任务

   浏览器的事件循环（event loop）中分成宏任务和微任务。JavaScript 中任务分成同步任务和异步任务。可以理解为执行优先级不同的异步任务。

4. 哪些是宏任务，哪些是微任务

   JavaScript 中主栈执行的大多数的任务，例如：定时器，事件绑定，ajax，回调函数，node 中 fs 操作模块等就是宏任务

   微任务(micro task)，promise, async/await, process.nextTick 等就是微任务。

5. 为什么要引入微任务队列呢

   微任务的引入是为了解决异步回调的问题，假设只有宏任务，那么每一个宏任务执行完后回调函数也放入宏任务队列，这样会造成队列多长，回调的时间变长，这样会造成页面的卡顿，所以引入了微任务。

6. 说出下面 log 的顺序

   ```js
   console.log(1);
   new Promise((resolve, reject) => {
     console.log(2);
     resolve();
   }).then(res => {
     console.log(3);
   });
   console.log(4);
   /* 输出
    * 1 -> 2 -> 4 ->3
    * 解答：第一轮宏任务就是主栈中的同步任务，先输出1，JavaScript 代码执行到promise立即执行输出2， resolve将.then() 中的代码放入到微任务队列，宏任务结束后输出 4，最后执行微任务队列输出3
    */
   ```

7. 简单说一下事件循环机制 （Event Loop）

   事件循环机制从整体上告诉了我们 JavaScript 代码的执行顺序。Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。执行顺序是先执行 Script 脚本，然后清空微任务队列，然后开始下一轮事件循环，继续先执行宏任务，再清空微任务队列，如此往复。

   - 宏任务：Script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering
   - 微任务：process.nextTick()/Promise

   ps: 上述的 setTimeout 和 setInterval 等都是任务源，真正进入任务队列的是他们分发的任务

## 应用题

- 下面代码输出顺序

  [从一道面试题谈谈对 EventLoop 的理解](https://mp.weixin.qq.com/s/3WLuVR4NWnDUOsVQuTSYJw)

  ```js
  setTimeout(() => console.log(0));
  new Promise(resolve => {
    console.log(1);
    resolve(2);
    console.log(3);
  }).then(o => console.log(o));

  new Promise(resolve => {
    console.log(4);
    resolve(5);
  })
    .then(o => console.log(o))
    .then(() => console.log(6));
  // 1 3 4 2 5 6 0
  // Promise 中 then 属于事件循环的微任务
  // setTimeout 才属于事件循环的宏任务
  ```

## Promise

Promise 的东西有点多，单独拿出来 [地址](/JavaScript/Promise)

## setTimeout

1. setTimeout 的返回值，其返回值有什么规律

   ```js
   // 返回定时器的id，可以用来清除定时器
   var timerId = setTimeout(func | code, delay);
   ```

2. setTimeout 中的 this

   ```js
   var x = 1;

   var obj = {
     x: 2,
     y: function () {
       console.log(this.x);
     },
   };
   // 在 setTimeout 中调用对象方法，会改变对象方法中的this
   setTimeout(obj.y, 1000); // 1

   // 解决方法1
   setTimeout(function () {
     obj.y();
     // obj.y放在一个匿名函数之中，这使得obj.y在obj的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值。
   }, 1000);

   // 解决方案3
   setTimeout(obj.y.bind(obj), 1000);
   ```

3. 使用 setTinterval 实现动画效果

   ```js
   var div = document.getElementById('someDiv');
   var opacity = 1;
   var fader = setInterval(function () {
     opacity -= 0.1;
     if (opacity >= 0) {
       div.style.opacity = opacity;
     } else {
       clearInterval(fader);
     }
   }, 100);
   // 上面代码每隔100毫秒，设置一次div元素的透明度，直至其完全透明为止
   ```

4. 判断当前页面 hash 是否发生变化

   ```js
   function watchHashChange(callback) {
     var hash = window.location.hash;
     var hashWatcher = setInterval(function () {
       if (hash !== window.location.hash) {
         callback();
       }
     }, 1000);
   }
   ```

5. setInterval 为什么不准

   setInterval 指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval 指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后 95 毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要 105 毫秒，那么它结束后，下一次执行就会立即开始。

   为了确保两次执行之间有固定的间隔，可以不用 setInterval，而是每次执行结束后，使用 setTimeout 指定下一次执行的具体时间。

   ```js
   var tiemr = setTimeout(function t() {
     // do someting
     timer = setTimeout(t, 2000);
   }, 2000);
   // 下一次执行总是在本次执行结束之后的2000毫秒开始
   ```

6. 写一个函数，清空页面上所有的定时器

   ```js
   function clearAllTimeout() {
     // 每一轮事件循环都检查一下
     var gid = setInterval(clears, 0);
     function clears() {
       // 定义一个定时器，根据定时器id递增的原理
       // 得到一个计算器编号，然后把编号比它小的计数器全部取消
       var id = setTimeout(function () {}, 0);
       while (id > 0) {
         if (id !== gid) {
           clearTimeout(id);
         }
         id--;
       }
     }
   }
   ```

7. 使用 setTimeout 做一个函数防抖

   函数防抖，规定在间隔时间内，发生新的调用，不执行调用，并且重新开始计时。如果过了指定时间，没有发生新调用，再调用回调函数。

   ```js
   $('textarea').on('keydown', debounce(ajaxAction, 2500));
   function debounce(fn, delapy) {
     var timer = null;
     return function () {
       var ctx = this;
       var args = arugments;
       clearTimout(timer); // 清除定时器
       timer = setTimeout(function () {
         fn.apply(ctx, args);
       }, delay);
     };
   }
   // 只要在2500毫秒之内，用户再次击键，就会取消上一次的定时器，然后再新建一个定时器。这样就保证了回调函数之间的调用间隔，至少是2500毫秒。
   ```

8. 如何解决 setTimeout 不准时的问题

   ```js
   function timer() {
     var speed = 500,
       counter = 1,
       start = new Date().getTime();

     function instance() {
       var ideal = counter * speed,
         real = new Date().getTime() - start;

       counter++;

       var diff = real - ideal;
       form.diff.value = diff;

       window.setTimeout(function () {
         instance();
       }, speed - diff); // 通过系统时间进行修复
     }

     window.setTimeout(function () {
       instance();
     }, speed);
   }
   ```

9. 定时器执行的顺序

   setTimeout 和 seTinterval 的执行顺序。先执行同步代码，当遇到微宏任务代码，先执行同步代码块，当碰到微宏任务（通常指异步任务）时会被挂起，当异步任务执行完毕会被推入实践队列，被放入队列中的任务不会立即执行，而是等待所有同步任务执行完毕，会去任务队列中拿任务，开始执行，如此往复。

## 参考链接

[JavaScript 教程-异步操作-定时器](https://wangdoc.com/javascript/async/timer.html#settimeout?share_token=97955361-A294-4BC7-952B-B866A95B3070&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1)

[字节面试官问粉丝，如何实现准时的 setTimeout](https://mp.weixin.qq.com/s/5TTBRDAAqPhUvOkQGVbGUw)
