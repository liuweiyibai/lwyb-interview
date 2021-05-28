# 数组常见面试题

1. ['1', '2', '3'].map(parseInt) what & why ?

   ['1', '2', '3'].map(parseInt) 的输出结果为 [1, NaN, NaN]。

   因为 parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数，radix 为介于 2-36 之间的数。

   在数组的 map 方法的回调函数中会传入 item（遍历项） 和 index（遍历下标) 作为前两个参数，所以这里的 parseInt 执行了对应的三次分别是

   parseInt(1, 0)
   parseInt(2, 1)
   parseInt(3, 2)
   对应的执行结果分别为 1、NaN、NaN。

2. 数组去重

   1. es5

      ```js
      function unique(arr) {
        return arr.filter((t, i) => {
          return arr.indexOf(t) === i;
        });
      }
      ```

   2. es6

      ```js
      var unique = (arr) => [...new Set(arr)];
      ```

3. 数组降维，数组扁平化

   ```js
   function flatten(arr) {
     let res = [];
     arr.forEach((t) => {
       if (Array.isArray(t)) {
         res = res.concat(flatten(t));
       } else {
         res.push(t);
       }
     });
     return res;
   }

   function flatten(arr) {
     while (arr.some((t) => Array.isArray(t))) {
       arr = [].concat(...arr);
     }
   }
   ```

4. 取数组最大值

   ```js
   let max = Math.max.apply(null, [2, 6, 7, 9, 4]);
   ```
