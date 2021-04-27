# 手写 js new 操作符

## 实现 js 中的 new 操作符

[参考地址](https://juejin.cn/post/6844903704663949325#heading-6)

```js
/**
 * new1(ctor,...otherArgs)
 * @param {*} ctor 构造函数
 * @returns 返回实例
 */
function new1(ctor) {
  if (typeof ctor !== 'function') {
    return;
  }
  // 指向构造函数
  new1.target = ctor;

  // var newObject = {}
  // newObject.__proto__ = ctor.prototype
  var newObjectPrototype = Object.create(ctor.prototype);
  var args = [].prototype.slice.call(arguments, 1);
  // var args = [...arguments].slice(1)
  // var args = Array.from(arguments).slice(1)

  // 通过 apply 改变指向
  // 如果构造函数中返回非null的对象，直接返回这个对象
  var newResult = ctor.apply(newObjectPrototype, args);

  var isObject = typeof newResult === 'object' && newResult !== null;
  var isFunction = typeof newResult === 'function';

  if (isObject || isFunction) {
    return newResult;
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObjectPrototype;
}
```

## 衍生问题

- 如何判断函数是普通调用还是 new 调用

  ```js
  function Person() {
    console.log(arguments);
    console.log(arguments.callee);
    console.log(this);
    if (this instanceof arguments.callee) {
      // new 调用
      console.log('new');
    } else {
      // 普通调用 this 是 window
    }

    //if(this.constructor === arguments.callee){
    // new 调用
    //}
  }
  ```
