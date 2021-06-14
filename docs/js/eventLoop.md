# 事件循环相关

- 下面代码输出顺序

  [从一道面试题谈谈对 EventLoop 的理解](https://mp.weixin.qq.com/s/3WLuVR4NWnDUOsVQuTSYJw)

  ```js
  setTimeout(() => console.log(0));
  new Promise((resolve) => {
    console.log(1);
    resolve(2);
    console.log(3);
  }).then((o) => console.log(o));

  new Promise((resolve) => {
    console.log(4);
    resolve(5);
  })
    .then((o) => console.log(o))
    .then(() => console.log(6));
  // 1 3 4 2 5 6 0
  // Promise 中 then 属于事件循环的微任务
  // setTimeout 才属于事件循环的宏任务
  ```

## Promise

1. 手写 Promise 系列 api

   ```js
   const PENDING = 'pending';
   const FULFILLED = 'fulfilled';
   const REJECTED = 'rejected';

   class Promise {
     constructor(executor) {
       this.status = PENDING;
       this.value = undefined;
       this.reason = undefined;
       this.onResolvedCallbacks = [];
       this.onRejectedCallbacks = [];

       let resolve = (value) => {
         if (this.status === PENDING) {
           this.status = FULFILLED;
           this.value = value;
           this.onResolvedCallbacks.forEach((fn) => fn());
         }
       };

       let reject = (reason) => {
         if (this.status === PENDING) {
           this.status = REJECTED;
           this.reason = reason;
           this.onRejectedCallbacks.forEach((fn) => fn());
         }
       };

       try {
         executor(resolve, reject);
       } catch (error) {
         reject(error);
       }
     }

     then(onFulfilled = (v) => v, onRejected = (err) => throw err) {
       // 解决 onFufilled，onRejected 没有传值的问题
       onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
       // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
       onRejected =
         typeof onRejected === 'function' ? onRejected : (err) => throw err;
       // 每次调用 then 都返回一个新的 promise
       let promise2 = new Promise((resolve, reject) => {
         if (this.status === FULFILLED) {
           //Promise/A+ 2.2.4 --- setTimeout
           setTimeout(() => {
             try {
               let x = onFulfilled(this.value);
               // x可能是一个proimise
               resolvePromise(promise2, x, resolve, reject);
             } catch (e) {
               reject(e);
             }
           }, 0);
         }

         if (this.status === REJECTED) {
           //Promise/A+ 2.2.3
           setTimeout(() => {
             try {
               let x = onRejected(this.reason);
               resolvePromise(promise2, x, resolve, reject);
             } catch (e) {
               reject(e);
             }
           }, 0);
         }

         if (this.status === PENDING) {
           this.onResolvedCallbacks.push(() => {
             setTimeout(() => {
               try {
                 let x = onFulfilled(this.value);
                 resolvePromise(promise2, x, resolve, reject);
               } catch (e) {
                 reject(e);
               }
             }, 0);
           });

           this.onRejectedCallbacks.push(() => {
             setTimeout(() => {
               try {
                 let x = onRejected(this.reason);
                 resolvePromise(promise2, x, resolve, reject);
               } catch (e) {
                 reject(e);
               }
             }, 0);
           });
         }
       });

       return promise2;
     }

     static resolve(value) {
       if (value instanceof Promise) {
         return value;
       }
       return new Promise((resolve) => resolve(value));
     }

     static reject(reason) {
       return Promise((_, reject) => reject(reason));
     }
   }
   const resolvePromise = (promise2, x, resolve, reject) => {
     // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
     if (promise2 === x) {
       return reject(
         new TypeError('Chaining cycle detected for promise #<Promise>')
       );
     }
     // Promise/A+ 2.3.3.3.3 只能调用一次
     let called;
     // 后续的条件要严格判断 保证代码能和别的库一起使用
     if ((typeof x === 'object' && x != null) || typeof x === 'function') {
       try {
         // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
         let then = x.then;
         if (typeof then === 'function') {
           // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
           then.call(
             x,
             (y) => {
               // 根据 promise 的状态决定是成功还是失败
               if (called) return;
               called = true;
               // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
               resolvePromise(promise2, y, resolve, reject);
             },
             (r) => {
               // 只要失败就失败 Promise/A+ 2.3.3.3.2
               if (called) return;
               called = true;
               reject(r);
             }
           );
         } else {
           // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
           resolve(x);
         }
       } catch (e) {
         // Promise/A+ 2.3.3.2
         if (called) return;
         called = true;
         reject(e);
       }
     } else {
       // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
       resolve(x);
     }
   };
   ```

2. Promise 有几种状态, Promise 有什么优缺点 ?
3. Promise 构造函数是同步还是异步执行，then 呢 ?promise 如何实现 then 处理 ?

   够造函数只同步执行，then 是微任务，等待事件循环结束

4. Promise 和 setTimeout 的区别 ?

   微任务和宏任务，任务队列

5. 如何实现 Promise.all?

   ```js
   Promise.prototype.all = function (promises) {
     promises = Array.from(promises);
     let len = promises.length;
     let arrs = [];
     return new Promise((resolve, reject) => {
       for (let i = 0; i < len; i++) {
         // 确保 promises 里每一项都是 Promise 对象
         let item = promises[i];
         Promise.resolve(item)
           .then((p) => {
             arrs[i] = p;
             // 如果全部执行完毕则返回所有
             if (arrs.length === len) {
               resolve(arrs);
             }
           })
           .catch((err) => {
             reject(err);
           });
       }
     });
   };
   ```

6. 如何实现 Promise.finally?

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

[JavaScript 教程-异步操作-定时器](https://wangdoc.com/javascript/async/timer.html#settimeout?share_token=97955361-A294-4BC7-952B-B866A95B3070&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1)

[字节面试官问粉丝，如何实现准时的 setTimeout](https://mp.weixin.qq.com/s/5TTBRDAAqPhUvOkQGVbGUw)
