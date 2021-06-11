# JavaScript 对象常见面试题

## 面试题

1. 如何判断函数是普通调用还是 new 调用

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
     if (this.constructor === arguments.callee) {
       console.log('new 调用');
     }
   }

   // 也可以通过
   function Person() {
     console.log(new.target === Person); // true
   }
   new Person(); //
   ```

## 实现继承的方式

1. 原型链继承

   ```js
   function Parent(name){
     this.name = name
     this.blood = ["a",'b']
   }
   Parent.prototype.run = functino(){
     log('running~~')
   }
   function Children(subName){
     this.subName = subName
   }
   Children.prototype.constructor = Children
   // 将父类构造函数的实例赋值给子类的原型
   Children.prototype = new Parent()
   // 给子类添加方法需要在上述方法后
   // 创建子类时无法向父类构造函数传参
   ```

2. 组合继承
   缺点就是会多调用一次父类构造函数

3. 组合寄生继承

   组合寄生继承是在子类构造函数中通过 call 调用超类一次，再通过 [`Object.create`](#手写-new) 创建子类的原型

   ```js
   function Parent(name) {
     this.name = name;
   }
   Parent.prototype.say = function () {
     console.log(this.name);
   };
   function init(subType, superType) {
     // proto.__proto__ = superType.prototype
     var proto = Object.create(superType.prototype);
     // 原型链查找，将父类的原型另存并且赋值给子类
     proto.constructor = subType;
     subType.prototype = proto;
   }
   function Child(name, age) {
     Parent.call(this, name);
     this.age = age;
   }
   init(Child, Parent);
   ```

## 手写 new

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

## 手写 object.create

Object.create()方法创建一个新的对象，并以方法的第一个参数作为新对象的**proto**属性的值
（以第一个参数作为新对象的构造函数的原型对象）
Object.create()方法还有第二个可选参数，
是一个对象，对象的每个属性都会作为新对象的自身属性，
对象的属性值以 descriptor（Object.getOwnPropertyDescriptor(obj, 'key')）的形式出现，且 enumerable 默认为 false

```js
// Object.create 实现的效果是将参数 proto 指向新创建对象的 __proto__ 上
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
