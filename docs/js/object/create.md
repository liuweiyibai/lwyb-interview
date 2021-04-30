# 对象常见面试题

## 实现对象 object.create 方法

实现一个 object.create

```js
function create(proto, des) {
  var Fn = function () {};
  Fn.prototype = proto;
  var newObj = new Fn();
  if (des) {
    Object.defineProperties(newObj, des);
  }
  return newObj;
}
```

## js 继承，babel 转译的es6 class 使用哪种继承方式实现
