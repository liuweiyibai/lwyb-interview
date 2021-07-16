# JavaScript 函数相关知识点

- call、apply 和 bind 区别

  都能改变 this 指向，其中 apply 和 call 返回函数执行结果，bind 返回一个新的函数

- 为什么 bind 多次绑定无效

  bind 的作用是生成一个新函数，且永久的改变该函数的 this 指向。用 apply 和 call 可以模拟 bind，简单实现如下

  ```js
  var obj = { a: '1' };
  var obj2 = { a: 2 };
  var fn = function () {
    console.log(this.a);
  };
  fn.prototype.bind = function (ctx, args) {
    var __self = this;
    return function bind2() {
      __self.apply(ctx, [...args, ...arguments]);
    };
  };
  var fn2 = fn.bind(obj);
  // 此时 fn2 = function bind2(){...}
  // 因为闭包此时 bind2 内部的 ctx 被永久指向了外层函数中的 ctx
  var fn3 = fn2.bind(obj2);
  // 实际上不管多少层嵌套，但是最后调用的仍然是第一次 apply 绑定的值, 通过闭包依然保留着引用
  // 所以 fn3 实际等于:
  fn3 = function bind2() {
    /**
     * 这是 fn2 的函数实际结构
     * function bind2() {
     *    __self.apply(ctx, [...args, ...arguments]);
     * }
     */
    var fn2 = function bind2() {
      __self.apply(ctx, [...args, ...arguments]);
    };
    return fn2.apply(ctx, [...args, ...arguments]);
  };
  ```

- bind 的第二个参数是什么

  是 bind 调用者的参数

## 手写函数常见 api 的实现

- call 实现

  [参考链接](https://www.cnblogs.com/echolun/p/12144344.html)

  ```js
  Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [];

    // 注意 i 从 1 开始，不算 context 参数
    for (var i = 1, len = arguments.length; i < len; i++) {
      args.push('arguments[' + i + ']');
      // 到了 eval 的作用域中， eval 参数就是 arguments[1, argument.length-1]，可以保证参数的类型正确，在eval执行环境中对 arguments 通过索引直接取值传入
      // 因为直接 push arguments[i] 到数组里面的话，eval 解析时是没有引号的，都是按照变量去引用的，所以会报错找不到某个变量
    }

    // let args = [...arguments].slice(1);
    // let result = context.fn(...args);
    var result = eval('context.fn(' + args + ')'); // 执行fn
    delete context.fn; // 删除 fn
    return result;
  };
  let foo = {
    value: 1,
  };
  function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
  }
  //表示bar函数的执行环境是foo，即bar函数里面的this代表foo,this.value相当于foo.value,然后给bar函数传递两个参数
  bar.call2(foo, 'black', '18'); // black 18 1
  ```

- bind 实现

  [参考地址](https://github.com/Raynos/function-bind/blob/master/implementation.js)

  bind 方法的定义，bind 方法创建一个新的函数，在 bind 被调用时，这个新函数的 this 被指定为 bind 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

  ```js
  /**
   * @param {*} ctx
   * var func2 = func.myBind(ctx, 函数参数)
   * fun2(args2 , 函数参数)
   */
  function myBind(ctx) {
    // 必须被一个函数调用
    if (typeof this !== 'function') {
      throw new TypeError('调用者必须是一个函数');
    }

    var _this = this; // myBind 函数的调用者

    // 截取第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    // bind 返回一个函数
    var instance = function () {
      // 将 arguments 转为数组
      var innerArgs = Array.prototype.slice.call(arguments);

      // 当返回的函数被当做构造函数调用
      if (this instanceof instance) {
        // this 被指定为第一个参数
        // 当使用 new 操作符调用绑定函数时，bind 的第一个参数无效
        // 所以要用 直接直接指为 this
        return _this.apply(this, args.concat(innerArgs));
      }
      // 非 new 模式调用
      return _this.apply(ctx, args.concat(innerArgs));
    };

    instance.prototype = _this.prototype;
    return instance;
  }

  Function.prototype.bind2 = myBind;

  function bb() {
    console.log(this.a);
    console.log(arguments);
  }

  var obj = {
    a: '22',
  };

  // 当 bind 返回被用作构造函数
  var _b = bb.bind2(obj);

  var n_b = new _b();

  _b(222);
  ```

## 函数柯里化

什么是函数柯里化，接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数

```js
function curry(fn, ...curryArgs) {
  return (...callbackArgs) => {
    // 最终的参数
    const totalArgs = [...curryArgs, ...callbackArgs];

    // 1. fn.length === totalArgs.length 参数和被修饰的函数参数相同，停止递归
    // 2. callbackArgs.length === 0 curry 修饰后直接执行返回的函数未传递参数调用，则停止递归
    return fn.length === totalArgs.length || callbackArgs.length === 0
      ? fn(...totalArgs)
      : curry(fn, ...totalArgs);
  };
}

var add = function (a, b) {
  return a + b;
};

// 上述 1.的情况
var add1 = curry(add, 1, 2); // 直接执行 add
add1();

// 上述 2. 的情况
var add2 = curry(add);
add2(); // 直接执行 add

// 上述1. 的情况
var add3 = curry(add, 1);
add3(2);
```
