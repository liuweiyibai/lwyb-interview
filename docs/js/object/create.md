# 对象常见面试题

## 实现对象 object.create 方法

实现一个 object.create

```js
// Object.create 实现的效果是将参数 proto 放在返回对象的 __proto__ 上
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
