# 面试题

- 实际工作中有靓点的
- 事件循环
- 什么是微任务
- 什么是宏任务
- 为什么要区分微任务宏任务
- 宏任务，先进先出，执行顺序不可控，需要有更高优先级的任务
  浏览器事件循环，完成一次宏任务，清空微任务队列

- node.js 中事件循环
- nodejs task 顺序

微宏任务在 nodejs 中执行顺序，node10 版本之前：

node<10 和浏览器一样

事件捕获还有冒泡

window.addEventListeners() 监听的是什么阶段的事件，默认冒泡 false，和第三个参数有关系
平常有哪个场景用到这个机制，事件委托

防抖和节流，使用场景，手写节流

```js
// 节流，固定间隔时间
```

Promise.all 一个报错
手写 一个 Promise.all

```js
function PromiseAll(ps) {
  let result = [];
  let counter = 0;
  return new Promise((resolve) => {
    for (let p = 0; p < ps.length; p++) {
      Promise.resolve(ps[p]).then((res) => {
        result[p] = res;
        counter++;
        if (counter.length === ps.length) {
          resolve();
        }
      });
    }
    // 上述方法无法保持 Promise 的顺序
    // 考虑 catch 场景
  }).catch((err) => {});
}
```

缓存要考虑失效，过期时间，利用装饰器做缓存

requestAnimationFrame 用来向浏览器请求动画的函数，屏幕刷新频率，比如完成一个宽度从 20 到 200 的过程执行缓动动画，如果元素宽度小于 200，则递归调用

```js
function animation() {
  const div = document.getElementById('box');
  div.style.width = Number(div.style.width) + 1 + 'px';
  if (div.style.width < 200) {
    requestAnimationFrame(animation);
  }
}

requestAnimationFrame(animation);
```

浏览器一帧内需要完成 6 个步骤

## 算法

接雨水，多数考察时间复杂度
