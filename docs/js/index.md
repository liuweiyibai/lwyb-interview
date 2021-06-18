# js 面试题

## 数据类型

- 讲讲 js 数据类型？基本和引用的区别？symbol 和 bigint 讲一讲应用场景

  null undefined string number boolean symbol bigint object

  Symbol 解决复杂对象属性名重复的问题，模拟私有方法，vue 的 inject 和 provide 时使用 Symbol

- symbol 有什么用处

  可以用来表示一个独一无二的变量防止命名冲突。比如模拟私有方法，在 vue 的 inject 和 provide 时可以使用 symbol 包装，防止变量命名冲突

- 常用判断数据类型的方式

  a instanceof b // a 的原型链上是否存在 b
  typof null // object
  typeof NaN // number
  使用 typeof 判断基础类型
  Object.prototype.toString.call(obj)

- 判断一个变量是否是数组，有哪些办法

  ```js
  Array.isArray();
  Object.prototype.toString.call([]); // '[object Array]'
  ```

- NaN 是什么，用 typeof 会输出什么？

  not a number 表示非数字，`typeof NaN === 'number'` // true

- 隐式类型转换

  隐式类型转化会发生在数据类型相加，逻辑判断（非全等时），对象会默认调用 ToPrimitive 方法进行运算

- 隐式类型转换应用题

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

- 如何判断对象是不是一个空对象

  ```js
  var isEmptyObj = function (obj) {
    return !!Object.keys(obj).length;
  };
  var isEmptyObj2 = function (obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  };
  ```

- 如何判断是数组类型

  ```js
  Array.isArray();
  a instanceof Array; // true
  ```

- 如何快速清空数组

  将数组长度设置为 0

- let 有什么用，有了 var 为什么还要用 let

  在 es6 之前，声明变量只能用 var。var 方式声明变量其实是很不合理的，准确的说，是因为 es5 里面没有块级作用域是很不合理的。没有块级作用域回来带很多难以理解的问题，比如 for 循环 var 变量泄露，变量覆盖等问题。let 声明的变量拥有自己的块级作用域，且修复了 var 声明变量带来的变量提升问题。

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

## 函数

1. new 操作符具体干了什么呢?

   1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
   2. 属性和方法被加入到 this 引用的对象中。
   3. 新创建的对象由 this 所引用，并且最后隐式的返回 this。
   4. 如果构造函数返回的是非 null 对象，那么就返回这个对象。

2. 如果 new 一个构造函数，构造函数 return `{}`、`null`、1 true 会发生什么情况

   如果返回一个非 null 对象或者函数，那么就返回函数内 `return` 的东西，否则就返回 new 创建的新对象

3. 手写 new 实现

   ```js
   function new2(ctor, ...args) {
     if (typeof ctor !== 'function') {
       // 报错
     }
     new2.target = ctor;
     let obj = Object.create(ctor.prototype);
     let result = ctor.apply(obj, args);
     if (
       (result !== null && typeof result === 'object') ||
       typeof result === 'function'
     ) {
       return result;
     }
     return obj;
   }
   ```

4. 什么是 js 作用域和作用域链

   - 作用域：每一个变量、函数都有其作用的范围，超出作用不得使用，这个叫做作用域

   - 作用域链：查找变量的过程。先找自己局部环境有没有声明变量或者是函数，如果有，则查看声明有无赋值或者是函数的内容，如果没有，则向上一级查找，从内部向外部扩散的查找方式
   - 函数作用域在函数调用时形成

5. 闭包是什么

   闭包是指有权访问另外一个函数作用域中的变量的函数。当前环境中存在指向父级作用域的引用。函数内部返回一个函数，或者函数作为参数都会产生闭包。

   闭包应用场景：函数柯里化、手写 bind、防抖节流、模块化

6. 了解 this 吗

   1. New 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
   2. 如果需要使用 bind 的柯里化和 apply 的数组解构，绑定到 null，尽可能使用 Object.create(null) 创建一个 DMZ 对象

   this 指向的四条规则

   1. 默认绑定，没有其他修饰（bind、apply、call)，在非严格模式下定义指向全局对象（window），在严格模式下定义指向 undefined

   2. 隐式绑定：调用位置是否有上下文对象，或者是否被某个对象拥有或者包含，那么隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。而且，对象属性链只有上一层或者说最后一层在调用位置中起作用

      ```js
      function foo() {
        console.log(this.a);
      }

      var obj = {
        a: 2,
        foo: foo,
      };
      obj.foo(); // 2
      var fun = obj.foo;
      fun(); // undefined
      ```

   3. 显示绑定：通过在函数上运行 call 和 apply 、bind，来显示的绑定 this
   4. new 绑定时，如果是 new 一个 bind 绑定的函数，那么会用 new 新建的对象替换这个 bind 绑定的 this

7. call、apply 以及 bind 函数内部实现是怎么样的

   ```js
   function myCall(ctx) {
     ctx = ctx || window;
     // 判断是不是被函数调动 this 是不是 函数，否则抛出错误
     var args = [];
     var _this = this;
     var context = {};
     context.fn = _this;
     for (var i = 1; i < arguments.length; i++) {
       args.push('arguments[' + i + ']');
     }
     var result = eval('context.fn(' + args + ')');
     delete context.fn;
     return result;
   }

   function bind(ctx) {
     ctx = ctx || window;
     var _this = this;
     var wrapArgs = Array.prototype.slice.call(argument, 1);
     var instance = function () {
       var innerArgs = Array.prototype.slice.call(argument);
       // 如果 instance 被当做构造函数使用
       if (this instanceof instance) {
         return _this.apply(this, wrapArgs.concat(innerArgs));
       }
       return _this.apply(ctx, wrapArgs.concat(innerArgs));
     };
     return instance;
   }
   ```

8. 箭头函数和普通函数区别

   1. arguments
   2. 上下文 this
   3. 箭头函数隐式返回
   4. 箭头函数不能走构造器函数

9. 简述一下 js 函数柯里化，柯里化的使用场景

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

10. 实现一个通用的柯里化函数

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

## 原型和原型链、es6 类

- 说一下原型链和原型链继承吧

  1. 什么是原型链？

     当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。
     这种通过 通过原型链接的逐级向上的查找链被称为原型链

  2. 什么是原型继承？

     一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。

- 说一下 es5 实现继承的几种方式

  1. 原型继承

     ```js
     function Parent(name) {
       this.name = name;
     }
     Parent.prototype.fun = function () {
       console.log(this.name);
     };
     Parent.prototype.run = '30s';
     function Child(age) {
       this.age = age;
     }
     // 父子类共享同一个原型，子类无法调用父类构造函数
     Child.prototype = Parent.prototype;
     ```

  2. 组合继承

     ```js
     function Parent(name) {
       this.name = name;
     }
     Parent.prototype.fun = function () {
       console.log(this.name);
     };
     function Child(age) {
       Parent.call(this, arguments);
       this.age = age;
     }
     Child.prototype = new Parent();
     // 缺点是调用两次父类构造函数
     ```

  3. 组合寄生继承

     ```js
     function install(parent, child) {
       const obj = Object.create(parent.prototype);
       child.prototype = obj;
       child.prototype.constructor = child;
     }
     function Parent(name) {
       this.name = name;
     }
     Parent.prototype.fun = function () {
       console.log(this.name);
     };
     function Child(age) {
       Parent.call(this, arguments);
       this.age = age;
     }
     install(Parent, Child);
     Child.prototype.run = function () {};
     // 缺点是多了一层原型链查找
     ```

- es6 中的 class 中的 static 关键词有了解吗

  static 修饰的方法，是直接在这个类上添加方法，构造函数可以直接使用，而不是加载函数对象的原型对象上

## 事件

- 事件传播的三个阶段是什么

  捕获 > 目标 > 冒泡

- js 事件流

  事件流是网页元素接收到事件的顺序。[DOM2 级事件] 规定的事件流包括三个阶段:事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会；然后是实际的目标接受事件；最后一个阶段是事件冒泡阶段，在这个阶段可以对事件做出响应。虽然捕获阶段在规范中不允许响应事件，但实际上还是会执行，所以有两次机会获取到目标对象。

  ```html
  <!DOCTYPE html>
  <div>
    <p id="parEle">我是父元素 <span id="sonEle">我是子元素</span></p>
  </div>
  <script type="text/javascript">
    var sonEle = document.getElementById('sonEle');
    var parEle = document.getElementById('parEle');

    parEle.addEventListener(
      'click',
      function () {
        alert('父级 冒泡');
      },
      false,
    );
    parEle.addEventListener(
      'click',
      function () {
        alert('父级 捕获');
      },
      true,
    );

    sonEle.addEventListener(
      'click',
      function () {
        alert('子级冒泡');
      },
      false,
    );
    sonEle.addEventListener(
      'click',
      function () {
        alert('子级捕获');
      },
      true,
    );
  </script>
  ```

- 你觉得 js 的事件是如何实现的

  基于发布订阅模式，浏览器在加载的时候会读取事件相关代码，但是实际只有等到事件被触发时才会执行。

  在 web 端，常见的 dom 事件:

  - DOM0 级事件，直接在 html 元素上绑定 on-someEvent，比如 onclick，取消的话，dom.onclick = null，同一个事件只能有一个处理程序，后面的会覆盖前面的。
  - DOM2 级事件，通过 addEventListener 注册事件，通过 removeEventListener 来删除事件，一个事件可以有多个事件处理程序，按顺序执行，捕获事件和冒泡事件。
  - DOM3 级事件，增加了事件类型，比如 UI 事件，焦点事件，鼠标事件。

## 零散知识点

1. js 严格模式是什么

   在代码块顶部以 "use strict" 开头，这样做的用处是：

   1. 阻止出现意外的全局变量：如果不是在 strict 模式里，那么赋值给一个没有声明的变量时，会自动的创建一个同名的全局变量，这是 js 中最常见的错误之一。在 strict 模式里，会尝试抛出一个 error.

   2. 强制排除 this 错误：在非 strict 模式里，this 引用为 null 或者 undefined 时，会自动强制指向全局，这会导致各种错误的引用。在 strict 模式里，this 值为 null 或者 undefined 将会抛出 error.

   3. 不允许重名的属性名或者参数名.在 strict 模式里，如果定义了如：var object={foo:’bar’,foo:’baz’};或者定义一个重名参数的函数，如:function foo(val1,val2,val1){}.会产生一个 error,而这个 bug 几乎一定会产生，但你可能浪费大量的时间才能找到。

   4. 使 eval()更加安全。在 strict 模式和非 strict 模式里，eval()存在很多不同。在 strict 模式里，变量和函数在 eval()中声明，但语句不在内部块创建，但是在非 strict 模式里，语句也会在内部块里创建，这也是常见的源码问题。

   5. 不正确使用 delete 会抛出 error:delete 操作（用于从 object 中删除一个属性）不能用于没有配置的属性，在非 strict 模式的代码里删除一个没有配置的属性会失败，但不会有提示，在 strict 模式里，则会抛出 error。

2. js 脚本加载问题，async、defer 问题

   1. defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在 window.onload 之前执行；如果依赖其他脚本和 DOM 结果，使用 defer
   2. async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。如果有多个 defer 脚本，会按照它们在页面出现的顺序加载。多个 async 脚本不能保证加载顺序。如果与 DOM 和其他脚本依赖不强时，使用 async

## BOM & DOM

1. documen.write 和 innerHTML 的区别

   1. document.write 可以重绘整个页面
   2. innerHTML 只能重绘页面的一部分

2. 什么是 Web Worker

   Web Worker 是为了解决 js 单线程问题的，因为 js 的 ui 和计算是同一个进程，如果计算量比较大就会阻塞 ui 的渲染,所以会引入 Web Worker 来解决这个问题。Web Worker 会独立一个上下文运行一个文件。Web Worker 使用起来非常简单，在“主线程”中执行 new Worker 返回一个 Web Worker 实例，通过监听 onmessage 事件获取消息，通过 postMessage 发送消息：“主线程”和 Worker 之间通过 postMessage 发送消息，通过监听 onmessage 事件来接收消息，从而实现二者的通信。

## 移动端

1. 移动端和 PC 端有哪些异同

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

## 应用题

1. 实现 sleep 函数

   ```js
   // 利用时间戳
   function sleep(delay) {
     var start = +new Date();
     while (+new Date() - start < delay) {
       continue;
     }
   }

   function sleep2(ms) {
     return new Promise((resolve) => {
       setTimeout(resolve, ms);
     });
   }
   ```

2. 判断一个单词是否是回文

   > 回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。比如 `mamam` `redivider`

   ```js
   function checkPalindromes(str) {
     return str === str.split('').reverse().join();
   }
   ```

3. 去掉一组整型数组重复的值

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

4. 下面代码将会输出什么结果？

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

5. 什么是浏览器的重排重绘

   浏览器下载完页面中的所有组件——HTML 标签、js、CSS、图片之后会解析生成两个内部数据结构——DOM 树和渲染树。DOM 树表示页面结构，渲染树表示 DOM 节点如何显示（绘制）。重排是需要重新分析页面元素尺寸；重绘是元素样式的改变。

6. 哪些操作会导致重排重绘

   1. 添加或者删除可见的 DOM 元素
   2. 元素位置改变
   3. 元素尺寸改变
   4. 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
   5. 页面渲染初始化（这个无法避免）
   6. 浏览器窗口尺寸改变

7. 有一个输入框，在用户停止输入后 1s 后搜索

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

8. 写一个闭包，每次调用的时候自加 1

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

9. 写一个函数，重复执行传入的函数指定次数，并且可以定义重复时间

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

10. redux compose 函数的实现

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

11. 手机号中间加\*号

    ```js
    function hiddenPhoneByStar(str, frontLen, endLen) {
      //str：要进行隐藏的变量  frontLen: 前面需要保留几位   SendLen: 后面需要保留几位
      var len = str.length - frontLen - endLen;
      var xing = '';
      for (var i = 0; i < len; i++) {
        xing += '*';
      }
      return (
        str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
      );
    }
    ```

## 测试

- ajax 和 fetch 区别

  都是原生 api，fetch 原生支持 Promise 与 json 数据解析

- es6 转 es5 代码的原理是什么

  通过 babel 的方式实现

  1. 将代码字符串解析为 ast 抽象语法树
  2. 对 ast 进行处理，在这个阶段可以对 es6 的 ast 进行转换，转换为 es5 的 ast
  3. 根据处理完后的 ast 生成代码符串和 sourcemap

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

## ES6 相关

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

3. Object.assign

   原对象的属性和方法都合并到了目标对象

4. for...of 循环

   for of 可以迭代迭代器对象类型的数据

5. import 和 export
6. 解构赋值
7. set 数据结构（可用于快速去重）
8. Spread Operator 展开运算符(...)
9. 字符串新增方法

## 常见 js 面试题

1. 简述同步和异步的区别

2. 实现一个函数 clone 可以对 js 中的五种主要数据类型（Number、string、Object、Array、Boolean）进行复制

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

   function clone2(Obj) {
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

3. 如何消除一个数组里面重复的元素

   数组去重

   ```js
   var arr = Array.from(new Set(arr2));
   ```

4. 写一个返回闭包的函数

   ```js
   // 记录某函数调用次数
   function a() {
     var u = 0;
     return function () {
       return u++;
     };
   }
   ```

5. 使用递归完成 1 到 100 的累加

   ```js
   function sum(total) {
     if (total === 1) {
       return 1;
     }
     return total + sum(--total);
   }
   sum(100);
   ```

6. console.log(1+'2')和 console.log(1-'2')的打印结果

   ```js
   console.log(1 + '2'); // 12
   console.log(1 - '2'); // -1
   ```

7. js 的事件委托是什么，原理是什么

   子元素可以将事件委托给外层元素

8. 列举几种解决跨域问题的方式，且说明原理

   iframe 跨域，cors

9. 谈谈垃圾回收机制的方式及内存管理

   js gc 有一个后台程序会一直监听当前执行上下文中的所有变量，当变量引用为 0，并且被标记为清除，自动进行回收，回收算法包括 标记清除、引用计数。闭包就使一个变量不会被垃圾回收所回收。

10. 写一个 function ，清除字符串前后的空格

    ```js
    return str.replace(/(^\s+)|(\s+$)/g, '');
    ```

11. 随机取 1-10 之间的整数

    ```js
    Math.floor(Math.random() * 10 + 1); // 生成 1-10 之间的随机正整数
    ```

12. 模块化开发怎么做

    amd、commonjs、es6modules 模块化方案

13. 异步加载 Js 的方式有哪些

    defer 和 async

14. xml 和 json 的区别
15. webpack 如何实现打包的
16. 常见 web 安全及防护原理
17. 用过哪些设计模式

    单例、工厂、策略、代理、发布订阅

18. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

19. js 有哪些方法定义对象

20. 谈谈你对 AMD、CMD 的理解

21. web 开发中会话跟踪的方法有哪些

    cookie 携带和 token 携带

22. 介绍 js 有哪些内置对象？

    Array Object Function RegExp Date

23. js 创建对象的几种方式？
24. eval 是做什么的？
25. null，undefined 的区别？

26. js 代码中的 "use strict"; 是什么意思 ? 使用它区别是什么？
27. js 延迟加载的方式有哪些？
28. defer 和 async
29. 说说严格模式的限制

30. attribute 和 property 的区别是什么？

31. ECMAScript6 怎么写 class 么，为什么会出现 class 这种东西?

32. 函数防抖节流的原理

33. 原始类型有哪几种？null 是对象吗？

34. 0.1 + 0.2 === 0.3 嘛？为什么？

    不相等，精度丢失可能出现在引擎的进制转换和对阶运算中

35. 说一下 js 中类型转换的规则？
36. 深拷贝和浅拷贝的区别？如何实现
37. 如何判断 this？箭头函数的 this 是什么
38. == 和 ===的区别
39. js 原型，原型链 ? 有什么特点？
40. typeof 和 instanceof()的用法区别
41. 什么是变量提升

42. 为什么会出现 setTimeout 倒计时误差？如何减少
43. 谈谈你对 js 执行上下文栈和作用域链的理解
44. prototype 和 proto 区别是什么？

45. 如何判断 img 加载完成

    img 的 onload 事件

46. 如何阻止冒泡？
47. 如何阻止默认事件？
48. 如何用原生 js 给一个按钮绑定两个 onclick 事件？

    使用 addEventlistener

49. 拖拽会用到哪些事件
50. document.write 和 innerHTML 的区别
51. 浏览器是如何渲染页面的？

    根据 http 请求拿回静态资源后，解析 html 和 css，分别生成 dom 树和 cssom 树，然后流式从上到下渲染

52. 对前端路由的理解？前后端路由的区别？

    就是通过前端控制 url 显示不同的视图
    后端就是不同的 url 对应不同的函数

53. 合并两个有序数组
    可以合并后排序

    ```js
    arr = arr.concat(arr2);
    arr.sort((a, b) => a - b);
    ```

54. 简单的深拷贝

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

55. 查找字符串中出现次数多的字符

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

56. 实现一个模板字符串的效果

    ```js
    function render(template, data) {
      const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
      if (reg.test(template)) {
        // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
      }
      return template; // 如果模板没有模板字符串直接返回
    }

    // 测试
    let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
    let person = {
      name: 'name',
      age: 12,
    };
    render(template, person); // 我是name，年龄12，性别undefined
    ```

57. 实现数组去重，new Set 的数组去重和自己实现的哪个性能会更好
58. 说一下跨域，jsonp 的原理是什么？node 中间件解决跨域问题的原理是什么？
59. import 和 require 的区别
60. 实现一个发布订阅，有订阅（on），发布（emit），一次订阅功能（once）
61. 实现请求并发限制，具体为：封装一个函数，传递请求并发的个数为参数，实现对并发请求的限制
62. 利用 async 和 await 如何处理异常事件
63. 箭头函数和普通函数有什么区别？如果想改变箭头函数中绑定 this 怎么办
64. 原生 js 判断鼠标在一个有对角线矩形的位置
