# Promise

实现 Promise 系列 api

1. 手写 Promise

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
         new TypeError('Chaining cycle detected for promise #<Promise>'),
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
             },
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

   微任务和宏任务，任务队列，异步执行先后

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

   finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它的回调函数不接受任何参数，一般用于结束状态。原理：不管成功或者失败都调用。

   ```js
   promise
   .then(result => {···})
   .catch(error => {···})
   .finally(() => {···});
   ```

   ```js
   Promise.finally = function (callback) {
     let P = this.constructor; // Promise
     return this.then(
       (value) => P.resolve(callback()).then(() => value),
       (reason) =>
         P.resolve(callback()).then(() => {
           throw reason;
         }),
     );
   };
   ```
