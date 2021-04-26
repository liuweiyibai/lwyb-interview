# 实现对象 object.create 方法

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
