# 函数柯里化

1. 什么是函数柯里化

   把接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数

   ```js
   // func 是要转换的函数
   function curry(func) {
     return function curried(...args) {
       if (args.length >= func.length) {
         // (1)
         return func.apply(this, args);
       } else {
         return function pass(...args2) {
           // (2)
           return curried.apply(this, args.concat(args2));
         };
       }
     };
   }
   ```
