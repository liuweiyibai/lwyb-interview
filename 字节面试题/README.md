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

```js
var b = [[1, 2], [x, 2][(4, 7)]];
```

vSync 显卡到浏览器

请求空闲回调 requestIdleCallback

```js
function slepp(delay = 0) {
  for (let start = new Date(); new Date() - start < delay; ) {}
}
```

单链表

JS 可以操作 DOM，GUI 渲染线程与 JS 线程是互斥的。所以 JS 脚本执行和浏览器布局、绘制不能同时执行。

当 JS 执行时间过长，超出了 16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。

1s 舒心 60hz

React16 架构可以分为三层：

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入 Reconciler
Reconciler（协调器）—— 负责找出变化的组件
Renderer（渲染器）—— 负责将变化的组件渲染到页面上

Reconciler 工作的阶段被称为 render 阶段。因为在该阶段会调用组件的 render 方法。
Renderer 工作的阶段被称为 commit 阶段。就像你完成一个需求的编码后执行 git commit 提交代码。commit 阶段会把 render 阶段提交的信息渲染在页面上。
render 与 commit 阶段统称为 work，即 React 在工作中。相对应的，如果任务正在 Scheduler 内调度，就不属于 work。

memo 使用场景

Fiber 节点对应 DOM 节点，fiber 树对应 DOM 树

初始化构建一个

redux，状态只读，单一数据来源，使用纯函数来修改 state

vue 分割任务和 react fiber

vue 模板，watch 组件级别的更新，更新范围很小

react 是根节点整 🌲 运算
