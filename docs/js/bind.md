# bind

[参考地址](https://github.com/Raynos/function-bind/blob/master/implementation.js)

bind 方法的定义， bind 方法创建一个新的函数，在 bind 被调用时，这个新函数的 this 被指定为 bind 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

```js
/**
 * @param {*} ctx
 * var func2 = func.myBind(ctx, 函数参数)
 * fun2(args2 , 函数参数)
 */
function myBind(ctx) {
  // 必须被一个函数调用
  if (typeof this !== 'function') {
    throw new TypeError('调用者必须是一个函数');
  }

  var _this = this; // myBind 函数的调用者

  // 截取第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  // bind 返回一个函数
  var instance = function () {
    // 将 arguments 转为数组
    var innerArgs = Array.prototype.slice.call(arguments);

    // 当返回的函数被当做构造函数调用
    if (this instanceof instance) {
      // this 被指定为第一个参数
      return _this.apply(this, args.concat(innerArgs));
    }
    // 非 new 模式调用
    return _this.apply(ctx, args.concat(innerArgs));
  };

  instance.prototype = _this.prototype;
  return instance;
}

Function.prototype.bind2 = myBind;

function bb() {
  console.log(this.a);
  console.log(arguments);
}

var obj = {
  a: '22',
};

// 当 bind 返回被用作构造函数
var _b = bb.bind2(obj);

var n_b = new _b();

_b(222);
```

## 衍生面试题

1. 为什么 bind 多次绑定无效
2. bind 的第二个参数是什么
