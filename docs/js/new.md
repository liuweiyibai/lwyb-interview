# 手写 js new 操作符

## 衍生问题

- 如何判断函数是普通调用还是 new 调用

  ```js
  function Person() {
    console.log(arguments);
    console.log(arguments.callee);
    console.log(this);
    if (this instanceof arguments.callee) {
      // new 调用
      console.log('new');
    } else {
      // 普通调用 this 是 window
    }

    //if(this.constructor === arguments.callee){
    // new 调用
    //}
  }
  ```
