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
