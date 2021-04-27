# setTimeout 相关

1. setTimeout 的返回值，其返回值有什么规律

   ```js
   // 返回定时器的id，可以用来清除定时器
   var timerId = setTimeout(func | code, delay);
   ```

2. setTimeout 中的 this

   ```js
   var x = 1;

   var obj = {
     x: 2,
     y: function () {
       console.log(this.x);
     },
   };
   // 在 setTimeout 中调用对象方法，会改变对象方法中的this
   setTimeout(obj.y, 1000); // 1

   // 解决方法1
   setTimeout(function () {
     obj.y();
     // obj.y放在一个匿名函数之中，这使得obj.y在obj的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值。
   }, 1000);

   // 解决方案3
   setTimeout(obj.y.bind(obj), 1000);
   ```

3. 使用 setTinterval 实现动画效果

   ```js
   var div = document.getElementById('someDiv');
   var opacity = 1;
   var fader = setInterval(function () {
     opacity -= 0.1;
     if (opacity >= 0) {
       div.style.opacity = opacity;
     } else {
       clearInterval(fader);
     }
   }, 100);
   // 上面代码每隔100毫秒，设置一次div元素的透明度，直至其完全透明为止
   ```

4. 判断当前页面 hash 是否发生变化

   ```js
   function watchHashChange(callback) {
     var hash = window.location.hash;
     var hashWatcher = setInterval(function () {
       if (hash !== window.location.hash) {
         callback();
       }
     }, 1000);
   }
   ```

5. setInterval 为什么不准

   setInterval 指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。因此实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval 指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后 95 毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要 105 毫秒，那么它结束后，下一次执行就会立即开始。

   为了确保两次执行之间有固定的间隔，可以不用 setInterval，而是每次执行结束后，使用 setTimeout 指定下一次执行的具体时间。

   ```js
   var tiemr = setTimeout(function t() {
     // do someting
     timer = setTimeout(t, 2000);
   }, 2000);
   // 下一次执行总是在本次执行结束之后的2000毫秒开始
   ```

6. 写一个函数，清空页面上所有的定时器

   ```js
   function clearAllTimeout() {
     // 每一轮事件循环都检查一下
     var gid = setInterval(clears, 0);
     function clears() {
       // 定义一个定时器，根据定时器id递增的原理
       // 得到一个计算器编号，然后把编号比它小的计数器全部取消
       var id = setTimeout(function () {}, 0);
       while (id > 0) {
         if (id !== gid) {
           clearTimeout(id);
         }
         id--;
       }
     }
   }
   ```

7. 使用 setTimeout 做一个函数防抖

   函数防抖，规定在间隔时间内，发生新的调用，不执行调用，并且重新开始计时。如果过了指定时间，没有发生新调用，再调用回调函数。

   ```js
   $('textarea').on('keydown', debounce(ajaxAction, 2500));
   function debounce(fn, delapy) {
     var timer = null;
     return function () {
       var ctx = this;
       var args = arugments;
       clearTimout(timer); // 清除定时器
       timer = setTimeout(function () {
         fn.apply(ctx, args);
       }, delay);
     };
   }
   // 只要在2500毫秒之内，用户再次击键，就会取消上一次的定时器，然后再新建一个定时器。这样就保证了回调函数之间的调用间隔，至少是2500毫秒。
   ```

[参考地址](https://wangdoc.com/javascript/async/timer.html#settimeout?share_token=97955361-A294-4BC7-952B-B866A95B3070&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1)
