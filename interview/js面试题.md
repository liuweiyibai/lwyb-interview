# js 面试题

- 讲讲 js 数据类型？基本和引用的区别？symbol 和 bigint 讲一讲应用场景

  null undefined string number boolean symbol bigint object

  Symbol 解决复杂对象属性名重复的问题，模拟私有方法，vue 的 inject 和 provide 时使用 Symbol

- 判断数据类型原理

  ```js
  a instanceof b; // a 的原型链上是否存在 b
  // typof null // object
  // typeof NaN // number
  // 使用 typeof 判断基础类型
  ```

- es6 中 let 暂时性死区详解

  var/let/const 区别？常量，局部变量，不可以重复定义，没有变量提升，形成作用域，let 和 const 暂时性死区
  暂时性死区？let 定义的变量无法在定以前访问，没有变量提升
  块级作用域？{} 作用域，函数也是一个块级作用域
  const a = {}; a.x = 1 能不能修改？可以

  let/const 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
  总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
  这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）。
  这将会导致 typeof 不在是一个百分百安全的操作符

  ```js
  typeof a; // 报错
  let a; // 如果是使用 var 声明就不会报错
  ```

- js 函数柯里化 ❎ 函数式编程，柯里化的使用场景

  柯里化是将多个相同函数的参数转为只传入一个参数的函数
  柯里化不会调用函数。它只是对函数进行转换

  ```js
  function add(a, b) {
    return a + b;
  }
  function curry(func) {
    return function (a) {
      return function (b) {
        return func(a, b);
      };
    };
  }

  var add2 = curry(add);
  add(1)(2); // 3
  ```

  通用的柯里化函数

  ```js
  // var slice = Array.prototype.slice

  function curry(func) {
    // 返回具名函数-包装器
    return function curried(...args) {
      // 这里可以使用 args = Array.prototype.slice.call(arguments)
      //var args = slice.apply(arguments)
      // 对于传入全部参数的处理
      // 如果我传入的参数大于或者等于被柯里化的函数需要的参数的话
      // 就是传入全部参数一次调用，具体看下面的使用场景
      // 现在调用
      if (args.length >= func.length) {
        return func.apply(this, args);
      } else {
        // 否则返回另外一个包装器
        return function (...args2) {
          // return curried.apply(this, args.concat(args2));
          return curried.apply(this, [...args, ...args2]);
        };
      }
    };
  }

  function curry2(fn, ...args) {
    // arugments slice(1)
    return function curried(...args2) {
      var currentArgs = [...args, ...args2];
      if (currentArgs.length >= fn.length) {
        return fn.apply(this, currentArgs);
      }
    };
  }

  function add(a, b, c) {
    return a + b + c;
  }
  var add2 = curry(add);
  ```

- redux compose 函数的实现

  ```js
  // 传入多个函数，每个函数都有同样的输入和输出
  // 比如必须redux中使用就是在增强 redux的store
  function compose(...args) {
    // 等于零直接执行
    if (args.length === 0) {
      return (arg) => arg;
    }
    if (args.length === 1) {
      return args[0]();
    }
    return args.reduce((fn1, fn2) => (args2) => fn1(fn2(args2)));
  }
  ```

- 闭包的应用场景

  节流和防抖

- 内置 new 的实现

  new 运算符的作用是创建一个用户定义的类型的实例或者具有构造函数的内置对象的实例。
  new 会做如下操作

  ```js
  /**
   * 模拟实现 new 操作符
   * @param  {Function} ctor [构造函数]
   * @return {Object|Function|Regex|Date|Error} [返回结果]
   */
  function newOperator(ctor) {
    if (typeof ctor !== 'function') {
      throw 'newOperator function the first param must be a function';
    }
    // ES6 new.target 是指向构造函数
    newOperator.target = ctor;
    // 1. 创建一个全新的对象，
    // 2. 并且执行[[Prototype]]链接
    // 4. 通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
    var newObj = Object.create(ctor.prototype);
    // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
    // 除去ctor构造函数的其余参数
    var argsArr = [].slice.call(arguments, 1);
    // 3.生成的新对象会绑定到函数调用的`this`。
    // 获取到ctor函数返回结果
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
    var isObject =
      typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if (isObject || isFunction) {
      return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return newObj;
  }
  ```

- 箭头函数为什么不能做构造函数

  ```js

  ```

- js 判断属性为空

  ```js
  var config = {};
  function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }
  ```

- 隐式类型转换

  ```js
  /**
   * var a=?
   * if(a==1 && a==2 && a==3){console.log('符合条件')}
   */

  var a = {
    num: 1,
    toString: function () {
      console.log('对象的 toString');
      return a.num++;
    },
    valueOf: function () {
      console.log('对象的 valueOf()');
      return 'hhhh';
    },
  };

  // 对象什么时候会调用 valueOf，什么时候会调用 toString

  if (a == 1 && a == 2 && a == 3) {
    console.log('恭喜答对啦！');
  } else {
    console.log('还是错了小子！');
  }
  ```

- Object.create

  `Object.create()` 方法创建一个新的对象，并以方法的第一个参数作为新对象的`__proto__`属性的值（以第一个参数作为新对象的构造函数的原型对象）

  `Object.create()` 方法还有第二个可选参数，是一个对象，对象的每个属性都会作为新对象的自身属性，对象的属性值以 descriptor（Object.getOwnPropertyDescriptor(obj, 'key')）的形式出现，且 enumerable 默认为 false

- ajax 和 fetch 区别

## es6 转 es5 代码的原理是什么

通过 babel 的方式实现

1. 将代码字符串解析为 ast 抽象语法树
2. 对 ast 进行处理，在这个阶段可以对 es6 的 ast 进行转换，转换为 es5 的 ast
3. 根据处理完后的 ast 生成代码符串

## 防抖和节流

主要用在避免重复触发某些事件行为或者频繁触发事件方法等

1. 函数防抖

   ```js
   // 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。
   // 不论调用多少次 都是 在 wait 后执行
   function debounce(fn, wait) {
     // 总会在最后一次触发 + wait 后执行 fn
     var timeout;
     return function () {
       var ctx = this;
       var args = arguments;
       clearTimeout(timeout);
       timeout = setTimeout(function () {
         fn.apply(ctx, args);
       }, wait);
     };
   }
   // 缺点1 不支持立刻执行
   // 缺点2 没考虑如果函数有返回值
   // 缺点3 没有考虑徐晓请求
   ```

2. 节流

   ```js
   function throttle(fn, wait) {
     // 触发高频事件，且 N 秒内只执行一次。
     var ctx, args, previous;
     return function () {
       var now = new Date();
       ctx = this;
       args = arguments;
       // 现在 - 上一次执行的时间点 > wait ，表示可以执行
       if (now - previous > wait) {
         fn.apply(ctx, args);
         previous = now;
       }
     };
   }
   ```

## ES6 面试题，ES6 新增方法面试题

1. let const var 比较
2. 反引号（`）标识
3. 函数默认参数
4. 箭头函数
5. 属性简写
6. 方法简写
7. Object.keys()方法，获取对象的所有属性名或方法名
8. Object.assign ()原对象的属性和方法都合并到了目标对象
9. for...of 循环
10. import 和 export
11. Promise 对象
12. 解构赋值
13. set 数据结构（可用于快速去重）
14. Spread Operator 展开运算符(...)
15. 字符串新增方法

## ES6 数组面试题

1. forEach()
2. map()
3. filter()
4. reduce()
5. some()
6. every()
7. all()方法

## ES6 编程题

1. 使用解构，实现两个变量的值的交换

   ```js
   let a = 1,
     b = 2;
   [a, b] = [b, a];
   ```

2. 利用数组推导，计算出数组 [1,2,3,4] 每一个元素的平方并组成新的数组。

   数组推导式已经被废弃

   ```js
   let arr = [1,2,3,4]
   let b = [i * 2 for (i of arr)];
   ```

## 常见 js 面试题

1. 简述同步和异步的区别

2. 怎么添加、移除、复制、创建、和查找节点
3. 实现一个函数 clone 可以对 Javascript 中的五种主要数据类型（Number、string、Object、Array、Boolean）进行复制

   ```js
   function copy(obj) {
     let initVal = Array.isArray(obj) ? [] : {};
   }
   ```

4. 如何消除一个数组里面重复的元素
5. 写一个返回闭包的函数

   ```js
   function a() {
     var u = 0;
     return function bar() {
       return u;
     };
   }
   ```

6. 使用递归完成 1 到 100 的累加

   ```js
   function sum(total) {
     if (total === 1) {
       return 1;
     }
     return total + sum(--total);
   }
   sum(100);
   ```

7. 如何判断数据类型

   typeof，借调 Object.toString 方法，instanceof

8. console.log(1+'2')和 console.log(1-'2')的打印结果

   ```js
   console.log(1 + '2'); // 12
   console.log(1 - '2'); // -1
   ```

9. Js 的事件委托是什么，原理是什么
10. 如何改变函数内部的 this 指针的指向

    apply bind call 等方法，或者修改调用该函数的调用者

11. 列举几种解决跨域问题的方式，且说明原理
12. 谈谈垃圾回收机制的方式及内存管理
13. 写一个 function ，清除字符串前后的空格
14. js 实现继承的方法有哪些

    原型继承，组合继承

15. 判断一个变量是否是数组，有哪些办法

    ```js
    Array.isArray();
    Object.prototype.toString.call([]); // '[object Array]'
    ```

16. let ，const ，var 有什么区别
17. 箭头函数与普通函数有什么区别
18. 随机取 1-10 之间的整数

    ```js
    Math.floor(Math.random() * 10 + 1); // 生成 1-10 之间的随机正整数
    ```

19. new 操作符具体干了什么
20. Ajax 原理
21. 模块化开发怎么做
22. 异步加载 Js 的方式有哪些
23. xml 和 json 的区别
24. webpack 如何实现打包的
25. 常见 web 安全及防护原理
26. 用过哪些设计模式
27. 为什么要同源限制
28. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别
29. javascript 有哪些方法定义对象
30. 说说你对 promise 的了解
31. 谈谈你对 AMD、CMD 的理解
32. web 开发中会话跟踪的方法有哪些
33. 介绍 js 有哪些内置对象？
34. 说几条写 JavaScript 的基本规范？
35. javascript 创建对象的几种方式？
36. eval 是做什么的？
37. null，undefined 的区别？
38. [“1”, “2”, “3”].map(parseInt) 答案是多少？
39. javascript 代码中的”use strict”;是什么意思 ? 使用它区别是什么？
40. js 延迟加载的方式有哪些？
41. defer 和 async
42. 说说严格模式的限制
43. attribute 和 property 的区别是什么？
44. ECMAScript6 怎么写 class 么，为什么会出现 class 这种东西?
45. 常见兼容性问题
46. 函数防抖节流的原理
47. 原始类型有哪几种？null 是对象吗？
48. 为什么 console.log(0.2+0.1==0.3) //false
49. 说一下 JS 中类型转换的规则？
50. 深拷贝和浅拷贝的区别？如何实现
51. 如何判断 this？箭头函数的 this 是什么
52. == 和 ===的区别
53. JavaScript 原型，原型链 ? 有什么特点？
54. typeof 和 instanceof()的用法区别
55. 什么是变量提升
56. call、apply 以及 bind 函数内部实现是怎么样的
57. 为什么会出现 setTimeout 倒计时误差？如何减少
58. 谈谈你对 JS 执行上下文栈和作用域链的理解
59. new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？
60. prototype 和 proto 区别是什么？
61. 使用 ES5 实现一个继承？
62. 取数组的最大值（ES5、ES6）
63. ES6 新的特性有哪些？
64. promise 有几种状态, Promise 有什么优缺点 ?
65. Promise 构造函数是同步还是异步执行，then 呢 ?promise 如何实现 then 处理 ?
66. Promise 和 setTimeout 的区别 ?
67. 如何实现 Promise.all ?
68. 如何实现 Promise.finally ?
69. 如何判断 img 加载完成
70. 如何阻止冒泡？
71. 如何阻止默认事件？
72. ajax 请求时，如何解释 json 数据
73. json 和 jsonp 的区别?
74. 如何用原生 js 给一个按钮绑定两个 onclick 事件？
75. 拖拽会用到哪些事件
76. document.write 和 innerHTML 的区别
77. 浏览器是如何渲染页面的？
78. 对前端路由的理解？前后端路由的区别？
79. 手写一个类的继承
80. XMLHttpRequest：XMLHttpRequest.readyState;状态码的意思
81. ajax 和 fetch 区别
82. 合并两个有序数组

    ```js
    // https://github.com/sisterAn/JavaScript-Algorithms/issues/3
    ```

83. 简单的深拷贝

    ```js
    function loop(obj) {
      // 判断只对对象和数组做处理，其他类型不考虑
      let cloneObj = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === 'object') {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              cloneObj[key] = loop(obj[key]);
            } else {
              cloneObj[key] = obj[key];
            }
          }
        }
      }
      return cloneObj;
    }
    let a = [1, 2, 3, 4],
      b = loop(a);
    a[0] = 2;
    console.log(a, b);
    ```

84. 查找字符串中出现次数多的字符

    ```js
    var str = 'fdsfjkjkjjjkjkjkjjjkjkjjk';
    function findStr(str) {
      let obj = {};
      str.split('').forEach((t) => {
        if (obj[t]) {
          obj[t] += 1;
        } else {
          obj[t] = 1;
        }
      });
      let max = Math.max.apply(null, Object.values(obj));
      Object.keys(obj).forEach((t) => {
        if (obj[t] === max) {
          console.log(t);
        }
      });
    }

    findStr(str);
    ```

85. 快速排序

86. 二分查找法，返回数组中某元素的位置

    ```js
    function binSearch(arr, data) {
      let start = 0;
      let end = arr.length - 1;
      while (start <= end) {
        var mid = Math.floor((end + start) / 2);
        if (arr[mid] < data) {
          start = mid + 1;
        } else if (arr[mid] > data) {
          end = mid - 1;
        } else {
          return mid;
        }
      }
      return -1;
    }
    var test = [1, 2, 3, 4, 5, 6];

    console.log(binSearch(test, 6));
    ```
