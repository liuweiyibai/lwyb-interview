# 数组常见面试题

数组常用方法 find findIndex filter some every reduce map forEach reducerRight includes
reduce 返回的是每一次循环传入函数的执行结果，然后在上一轮循环结果上继续执行函数

迭代器，将伪数组转为 数组

```js
Array.from;
Array.prototye.slice.call(伪数组, 0);
Array.fill;
Array.of();
```

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
      var unique = arr => [...new Set(arr)];
      ```

3. 数组降维，数组扁平化

   ```js
   function flatten(arr) {
     let res = [];
     arr.forEach(t => {
       if (Array.isArray(t)) {
         res = res.concat(flatten(t));
       } else {
         res.push(t);
       }
     });
     return res;
   }

   function flatten(arr) {
     while (arr.some(t => Array.isArray(t))) {
       arr = [].concat(...arr);
     }
   }
   ```

4. 取数组最大值

   ```js
   let max = Math.max.apply(null, [2, 6, 7, 9, 4]);
   ```

- 数组常用的函数有哪些

  push
  pop
  splice
  slice
  shift
  unshift
  sort
  find
  findIndex
  map/filter/reduce 等函数式编程方法
  还有一些原型链上的方法：toString/valueOf

- 函数中的 arguments 是数组吗？类数组转数组的方法了解一下？

  是类数组，是属于鸭子类型的范畴，长得像数组。

  ... 运算符
  Array.from
  Array.prototype.slice.apply(arguments)

## 实现数组的几个方法

```js
Array.prototype.every = function (fn) {
  let flag = true;
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (!flag) {
      return false;
    }
  }
  return flag;
};
Array.prototype.some = function (fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return flag;
    }
  }
  return false;
};
Array.prototype.find = function (fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return this[i];
    }
  }
};
Array.prototype.findIndex = function (fn) {
  for (let i = 0; i < this.length; i++) {
    let flag = fn(this[i]);
    if (flag) {
      return i;
    }
  }
};
```
