# js-面试题

1. 实现 sleep 函数

   ```js
   function sleep(ms) {
     var start = Date.now();
     while (Date.now() - start > ms) {}
   }
   ```
