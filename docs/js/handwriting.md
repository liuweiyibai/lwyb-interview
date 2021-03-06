# 手写 js 几个常见的 api

## 继承实现

- 原型链继承

  缺点是原型污染，子类无法调用父类构造函数

  ```js
  function Person(name) {
    this.name = name;
  }
  Parent.prototype.family = [];

  function Man(name) {
    // 并且子类还无法调用父类的构造器
    this.family.push(name);
  }

  // 父子类共享一个原型，原型值被共享，子类原型污染了本应该属于父类的原型数据
  Man.prototype = new Person();
  ```

- 组合继承

  缺点是调用两次父类构造函数

  ```js
  function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
  }
  Animal.prototype.getName = function () {
    return this.name;
  };
  function Dog(name, age) {
    // 可以调用父类的构造器
    Animal.call(this, name);
    this.age = age;
  }
  // 原型共享，将子类构造器指回自己
  Dog.prototype = new Animal();
  Dog.prototype.constructor = Dog;

  let dog1 = new Dog('奶昔', 2);
  dog1.colors.push('brown');
  let dog2 = new Dog('哈赤', 1);
  console.log(dog2);
  // { name: "哈赤", colors: ["black", "white"], age: 1 }
  ```

- 组合寄生

  ```js
  function install(parent, child) {
    // 利用 object.create 创建对象
    const obj = Object.create(parent.prototype);
    child.prototype = obj;
    child.prototype.constructor = child;
  }
  function Parent(name) {
    this.name = name;
  }
  Parent.prototype.fun = function () {
    console.log(this.name);
  };
  function Child(age) {
    Parent.call(this, arguments);
    this.age = age;
  }
  install(Parent, Child);
  Child.prototype.run = function () {};
  // 缺点是多了一层原型链查找
  ```

## 数组

- 手写数组 forEach 方法

  ```js
  Array.prototype.forEach = function (callback) {
    let __self = this;
    for (let i = 0; i < 0; i++) {
      callback(__self[i], i, __self);
    }
  };
  ```

- 手写数组 find 方法

  ```js
  Array.prototype.find = function (callback) {
    let __self = this;
    for (let i = 0; i < 0; i++) {
      let item = callback(__self[i], i, __self);
      return item || null;
    }
  };
  ```

## 函数原型方法

- apply 和 call

  ```js
  Function.prototype.apply = function (ctx, arr) {
    ctx = ctx === undefined ? window : ctx;
    // 如果 ctx 有默认 fn 属性，可以对 ctx 的 fn 属性做备份
    ctx.fn = this;
    var result;
    if (!arr) result = ctx.fn();
    else {
      var args = [];
      for (var i = 0; i < arr.length; i++) {
        args.push('arr[' + i + ']');
      }
      result = eval('ctx.fn(' + args + ')');
    }
    delete ctx.fn;
    return result;
    // call 的实现就是将除 ctx 外的 arguments 转为数组执行 apply 内部操作
  };

  // es6 实现 call
  Function.prototype.call = function (ctx = window, ...args) {
    var fn = Symbol();
    ctx.fn = this;
    const res = ctx.fn(args);
    delete ctx.fn;
    return res;
  };
  ```

- bind

  ```js
  var slice = Array.prototype.slice;
  Funciton.prototype.bind = function (ctx) {
    var args = slice.call(arguments, 1);
    var _this = this;
    var fn = function () {
      var iargs = slice.call(arguments, 0);
      var totalArgs = args.concat(iargs);
      // 这段闭包就解释了，为什么多次 bind 还是指向的第一次 bind 的 this
      if (this instanceof fn) {
        return _this.apply(this, totalArgs);
      }
      return _this.apply(ctx, totalArgs);
    };
    fn.prototype = _this.prototype;
    return fn;
  };
  ```

- new

  实现 new 操作符

  ```js
  function new1(ctor) {
    if (typeof ctor !== 'function') {
      return;
    }
    // 指向构造函数
    // new.target 可以用来判断是否是 new 方式调用的
    new1.target = ctor;

    // var newObject = {}
    // newObject.__proto__ = ctor.prototype
    var newObjectPrototype = Object.create(ctor.prototype);
    var args = [].prototype.slice.call(arguments, 1);
    // var args = [...arguments].slice(1)
    // var args = Array.from(arguments).slice(1)

    // 通过 apply 改变指向
    // 如果构造函数中返回非null的对象或者函数，直接返回这个对象
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

## object

- 实现 object.create

  ```js
  var create = function (obj, des) {
    var fn = function () {};
    fn.prototpe = obj;
    var f = new fn();
    if (des) {
      Object.defineProperties(f, des);
    }
    return f;
  };
  ```

- 实现 instanceof 操作符

  ```js
  // 实例.__proto__ === 父类.prototype
  function instanceOf(left, right) {
    // left 是否在 right 的原型链上
    var lproto = left.__proto__;
    while (true) {
      // 查到原型链终点是 null
      if (lproto === null) return false;
      if (lproto === right.prototype) {
        return true;
      }
      lproto = lproto.__proto__;
    }
  }
  ```
