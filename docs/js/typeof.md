# js 数据类型

## 基础数据类型

## 判断数据类型有哪些方法

```js
typeof;
  // 用来判断基础数据类型
instenceof
```

- 实现一个 instanceof

  ```js
  function myInstanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if (typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while (true) {
      //循环往下寻找，直到找到相同的原型对象
      if (proto === null) return false;
      if (proto === right.prototype) return true; //找到相同原型对象，返回true
      proto = Object.getPrototypeof(proto);
    }
  }
  // 验证一下自己实现的myInstanceof是否OK
  console.log(myInstanceof(new Number(123), Number)); // true
  console.log(myInstanceof(123, Number)); // false
  ```

## 实现一个通用的类型判断函数

```js
function getType(obj) {
  let type = typeof obj;
  if (type !== 'object') {
    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, '$1'); // 注意正则中间有个空格
}
/* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
getType([]); // "Array" typeof []是object，因此toString返回
getType('123'); // "string" typeof 直接返回
getType(window); // "Window" toString返回
getType(null); // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined); // "undefined" typeof 直接返回
getType(); // "undefined" typeof 直接返回
getType(function () {}); // "function" typeof能判断，因此首字母小写
getType(/123/g); //"RegExp" toString返回
```
