# js-面试题

1. 实现 sleep 函数

   ```js
   function sleep(ms) {
     var start = Date.now();
     while (Date.now() - start > ms) {}
   }
   ```

2. js 严格模式是什么

   在代码块顶部以 "use strict" 开头，这样做的用处是：

   1. 阻止出现意外的全局变量：如果不是在 strict 模式里，那么赋值给一个没有声明的变量时，会自动的创建一个同名的全局变量，这是 JavaScript 中最常见的错误之一。在 strict 模式里，会尝试抛出一个 error.

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

    浏览器下载完页面中的所有组件——HTML 标签、JavaScript、CSS、图片之后会解析生成两个内部数据结构——DOM 树和渲染树。DOM 树表示页面结构，渲染树表示 DOM 节点如何显示（绘制）。重排是需要重新分析页面元素尺寸；重绘是元素样式的改变。

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

    Babel 是一个 ES6 转码器，可以将 ES6 代码转为 ES5 代码，以便兼容那些还没支持 ES6 的平台。其主要流程是解析->转译->生成的过程，主要是对es6语法进行抽象解析

20. let 有什么用，有了 var 为什么还要用 let

    在 es6 之前，声明变量只能用 var。var 方式声明变量其实是很不合理的，准确的说，是因为 es5 里面没有块级作用域是很不合理的。没有块级作用域回来带很多难以理解的问题，比如 for 循环 var 变量泄露，变量覆盖等问题。let 声明的变量拥有自己的块级作用域，且修复了 var 声明变量带来的变量提升问题。

21. 实现一个对象数组深拷贝

    ```js
    function clone(Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = []; //创建一个空的数组
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
