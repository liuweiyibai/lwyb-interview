# js 面试题

1. 实现 sleep 函数

   ```js
   function sleep(ms) {
     var start = Date.now();
     while (Date.now() - start > ms) {}
   }

   function sleep2(ms) {
     return new Promise((resolve) => {
       setTimeout(resolve, ms);
     });
   }
   ```

2. js 严格模式是什么

   在代码块顶部以 "use strict" 开头，这样做的用处是：

   1. 阻止出现意外的全局变量：如果不是在 strict 模式里，那么赋值给一个没有声明的变量时，会自动的创建一个同名的全局变量，这是 js 中最常见的错误之一。在 strict 模式里，会尝试抛出一个 error.

   2. 强制排除 this 错误：在非 strict 模式里，this 引用为 null 或者 undefined 时，会自动强制指向全局，这会导致各种错误的引用。在 strict 模式里，this 值为 null 或者 undefined 将会抛出 error.

   3. 不允许重名的属性名或者参数名.在 strict 模式里，如果定义了如：var object={foo:’bar’,foo:’baz’};或者定义一个重名参数的函数，如:function foo(val1,val2,val1){}.会产生一个 error,而这个 bug 几乎一定会产生，但你可能浪费大量的时间才能找到。

   4. 使 eval()更加安全。在 strict 模式和非 strict 模式里，eval()存在很多不同。在 strict 模式里，变量和函数在 eval()中声明，但语句不在内部块创建，但是在非 strict 模式里，语句也会在内部块里创建，这也是常见的源码问题。

   5. 不正确使用 delete 会抛出 error:delete 操作（用于从 object 中删除一个属性）不能用于没有配置的属性，在非 strict 模式的代码里删除一个没有配置的属性会失败，但不会有提示，在 strict 模式里，则会抛出 error。

3. 判断一个单词是否是回文

   > 回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。比如 `mamam` `redivider`

   ```js
   function checkPalindromes(str) {
     return str === str.split('').reverse().join();
   }
   ```

4. 去掉一组整型数组重复的值

   比如输入: [1,13,24,11,11,14,1,2]，输出: [1,13,24,11,14,2]，需要去掉重复的 11 和 1 这两个元素

   这道问题出现在诸多的前端面试题中，主要考察个人对 Object 的使用，利用 key 来进行筛选

   ```js
   function unique(arr) {
     let hashTable = {};
     let data = [];
     let length = arr.length;
     for (let i = 0; i < length; i++) {
       let current = arr[i];
       if (!hashTable[current]) {
         hashTable[current] = true;
         data.push(current);
       }
     }
     return data;
   }
   ```

5. 说一下你对作用域的理解

   每一个变量、函数都有其作用的范围，超出作用不得使用，这个叫做作用域

6. 作用域链

   查找变量的过程。先找自己局部环境有没有声明变量或者是函数，如果有，则查看声明有无赋值或者是函数的内容，如果没有，则向上一级查找，从内部向外部扩散的查找方式

7. new 操作符具体干了什么呢?

   1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
   2. 属性和方法被加入到 this 引用的对象中。
   3. 新创建的对象由 this 所引用，并且最后隐式的返回 this。
   4. 如果构造函数返回的是非 null 对象，那么就返回这个对象。

8. documen.write 和 innerHTML 的区别

   1. document.write 可以重绘整个页面
   2. innerHTML 只能重绘页面的一部分

9. 下面代码将会输出什么结果？

   ```js
   var result = (function () {
     return 1;
   },
   function () {
     return '2';
   })();
   console.log(result); // 结果是2
   // 因为内部直接执行两个函数，后面的return的值会覆盖前面的return的值
   ```

10. 移动端和 PC 端有哪些异同

    PC 考虑的是浏览器兼容性，移动端开发考虑的更多的是手机兼容性，因为目前 ios 和 android 系统一般浏览器用的都是 webkit 内核，所以做移动端开发，更多考虑的应该是手机分辨率的适配，和不同操作系统的略微差异化。

    1. 移动端不需要 300ms 的单击确认，所以不要监听 click 事件
    2. 移动端网络一般较慢，如何减小页面体积及请求数，利用好缓存？
    3. 移动端需要点击的元素及其间隔不能太小，考虑手指的面积？
    4. 横屏和竖屏下的表现？
    5. 不同浏览器间的兼容性（太多了，如 position:fixed）？
    6. Retina 屏图片会不会模糊？
    7. 输入状态键盘会不会挡住输入内容？
    8. 在浏览器上点击后退的行为？
    9. 某些浏览器（如 Safari）的隐私模式下 cookie 和 localStorage 的替代方案？

11. 什么是浏览器的重排重绘

    浏览器下载完页面中的所有组件——HTML 标签、js、CSS、图片之后会解析生成两个内部数据结构——DOM 树和渲染树。DOM 树表示页面结构，渲染树表示 DOM 节点如何显示（绘制）。重排是需要重新分析页面元素尺寸；重绘是元素样式的改变。

12. 哪些操作会导致重拍重绘

    1. 添加或者删除可见的 DOM 元素
    2. 元素位置改变
    3. 元素尺寸改变
    4. 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
    5. 页面渲染初始化（这个无法避免）
    6. 浏览器窗口尺寸改变

13. 有一个输入框，在用户停止输入后 1s 后搜索

    ```js
    function debounce(fn, wait) {
      var timer;
      return function () {
        var ctx = this;
        var args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(ctx, arguments);
        }, wait);
      };
    }
    function seach() {}
    input.addEventListener('input', function () {
      debounce(search, 1000);
    });
    ```

14. 什么是 Web Worker

    Web Worker 是为了解决 js 单线程问题的，因为 js 的 ui 和计算是同一个进程，如果计算量比较大就会阻塞 ui 的渲染,所以会引入 Web Worker 来解决这个问题。Web Worker 会独立一个上下文运行一个文件。Web Worker 使用起来非常简单，在“主线程”中执行 new Worker 返回一个 Web Worker 实例，通过监听 onmessage 事件获取消息，通过 postMessage 发送消息：“主线程”和 Worker 之间通过 postMessage 发送消息，通过监听 onmessage 事件来接收消息，从而实现二者的通信。

15. 事件传播的三个阶段是什么

    捕获 > 目标 > 冒泡

16. 写一个闭包，每次调用的时候自加 1

    ```js
    function b() {
      var i = 0;
      return function () {
        return i++;
      };
    }
    bid = b();
    bid(); // 0
    bid(); // 1
    ```

17. 写一个函数，重复执行传入的函数指定次数，并且可以定义重复时间

    ```js
    function doRepeat(func, times, waits) {
      let i = 0;
      return function () {
        const args = arguments;
        const timer = setInterval(function () {
          if (times === i) {
            clearInterval(timer);
            return;
          }
          i++;
          func(args[0]);
        }, waits);
      };
    }
    // 每间隔1s执行 console.log ，执行10次
    var b = doRepeat(console.log, 10, 1000);
    b('ff');
    ```

18. defer 和 async 的区别

    1. defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在 window.onload 之前执行；
    2. async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。如果有多个 defer 脚本，会按照它们在页面出现的顺序加载。多个 async 脚本不能保证加载顺序。

19. Babel 是什么，有什么作用

    Babel 是一个 es6 转码器，可以将 es6 代码转为 es5 代码，以便兼容那些还没支持 es6 的平台。其主要流程是解析->转译->生成的过程，主要是对 es6 语法进行抽象解析

20. let 有什么用，有了 var 为什么还要用 let

    在 es6 之前，声明变量只能用 var。var 方式声明变量其实是很不合理的，准确的说，是因为 es5 里面没有块级作用域是很不合理的。没有块级作用域回来带很多难以理解的问题，比如 for 循环 var 变量泄露，变量覆盖等问题。let 声明的变量拥有自己的块级作用域，且修复了 var 声明变量带来的变量提升问题。

21. 实现一个对象数组深拷贝

    ```js
    function clone(Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = []; // 创建一个空的数组
        var i = Obj.length;
        while (i--) {
          buf[i] = clone(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象
        for (var k in Obj) {
          //为这个对象添加新的属性
          buf[k] = clone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    }
    ```

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

- js 判断对象为空

  ```js
  var config = {};
  function isEmptyObj(obj) {
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

  都是原生 api，fetch 原生支持 promise 与 json 数据解析

- es6 转 es5 代码的原理是什么

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
3. 实现一个函数 clone 可以对 js 中的五种主要数据类型（Number、string、Object、Array、Boolean）进行复制

   ```js
   function clone(obj) {
     if (Array.isArray(obj)) {
       let res = [];
       obj.forEach((t) => {
         res.push(clone(t));
       });
       return res;
     } else if (obj instanceof Object) {
       let res = {};
       for (let key in obj) {
         res[key] = clone(obj[key]);
       }
       return res;
     } else {
       return obj;
     }
   }
   ```

4. 如何消除一个数组里面重复的元素

   数组去重

   ```js
   var arr = Array.from(new Set(arr2));
   ```

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

16. 箭头函数与普通函数有什么区别

    arguments、构造函数还有 this 指向的问题

17. 随机取 1-10 之间的整数

    ```js
    Math.floor(Math.random() * 10 + 1); // 生成 1-10 之间的随机正整数
    ```

18. 模块化开发怎么做
19. 异步加载 Js 的方式有哪些
20. xml 和 json 的区别
21. webpack 如何实现打包的
22. 常见 web 安全及防护原理
23. 用过哪些设计模式

    单例、工厂

24. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

25. js 有哪些方法定义对象

26. 说说你对 promise 的了解

27. 谈谈你对 AMD、CMD 的理解

28. web 开发中会话跟踪的方法有哪些

    cookie 携带和 token 携带

29. 介绍 js 有哪些内置对象？

    Array Object Function RegExp Date

30. js 创建对象的几种方式？
31. eval 是做什么的？
32. null，undefined 的区别？

33. js 代码中的 "use strict"; 是什么意思 ? 使用它区别是什么？
34. js 延迟加载的方式有哪些？
35. defer 和 async
36. 说说严格模式的限制

37. attribute 和 property 的区别是什么？

38. ECMAScript6 怎么写 class 么，为什么会出现 class 这种东西?

39. 函数防抖节流的原理

40. 原始类型有哪几种？null 是对象吗？

41. 为什么 console.log(0.2+0.1==0.3) //false
42. 说一下 js 中类型转换的规则？
43. 深拷贝和浅拷贝的区别？如何实现
44. 如何判断 this？箭头函数的 this 是什么
45. == 和 ===的区别
46. js 原型，原型链 ? 有什么特点？
47. typeof 和 instanceof()的用法区别
48. 什么是变量提升
49. call、apply 以及 bind 函数内部实现是怎么样的
50. 为什么会出现 setTimeout 倒计时误差？如何减少
51. 谈谈你对 js 执行上下文栈和作用域链的理解
52. prototype 和 proto 区别是什么？
53. 使用 es5 实现一个继承？
54. es6 新的特性有哪些？
55. Promise 有几种状态, Promise 有什么优缺点 ?
56. Promise 构造函数是同步还是异步执行，then 呢 ?promise 如何实现 then 处理 ?
57. Promise 和 setTimeout 的区别 ?

    微任务和宏任务，任务队列

58. 如何实现 Promise.all ?
59. 如何实现 Promise.finally ?
60. 如何判断 img 加载完成
61. 如何阻止冒泡？
62. 如何阻止默认事件？
63. ajax 请求时，如何解析 json 数据
64. 如何用原生 js 给一个按钮绑定两个 onclick 事件？

    使用 addEventlistener

65. 拖拽会用到哪些事件
66. document.write 和 innerHTML 的区别
67. 浏览器是如何渲染页面的？

    根据 http 请求拿回静态资源后，解析 html 和 css，分别生成 dom 树和 cssom 树，然后流式从上到下渲染

68. 对前端路由的理解？前后端路由的区别？

    就是通过前端控制 url 显示不同的视图
    后端就是不同的 url 对应不同的函数

69. 手写一个类的继承

70. 合并两个有序数组
    可以合并后排序

    ```js
   
    ```

71. 简单的深拷贝

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

72. 查找字符串中出现次数多的字符

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

