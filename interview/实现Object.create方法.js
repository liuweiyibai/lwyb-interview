/**
 * Object.create()方法创建一个新的对象，
 * 并以方法的第一个参数作为新对象的__proto__属性的值
 * （以第一个参数作为新对象的构造函数的原型对象）
 *
 * Object.create()方法还有第二个可选参数，
 * 是一个对象，对象的每个属性都会作为新对象的自身属性，
 * 对象的属性值以descriptor（Object.getOwnPropertyDescriptor(obj, 'key')）的形式出现，且enumerable默认为false
 * @param {*} proto
 * @param {*} propertyObj
 * @returns
 */

// https://segmentfault.com/a/1190000022416760
// https://juejin.cn/post/6844903589815517192
Object.prototype.create2 = function (proto, propertyObj) {
  if (propertyObj === null) {
    return {};
  }

  function Fn() {}
  Fn.prototype = proto;
  var newObj = new Fn(); // 实例的 __proto__ === 构造函数的prototype
  if (propertyObj !== undefined) {
    Object.defineProperties(newObj, propertyObj);
  }
};

/**
 * Object.create(null) 强调了啥
 * Object.create() 的定义
 *
 * Object.create(proto,[propertiesObject])
 * 1. proto 是新创建对象的原型对象
 * 2. propertiesObject（可选），要添加到新对象的可枚举的属性（添加到对象本身，而不是其原型链上）
 */

const car = {
  isSportsCar: false,
  introduction: function () {
    console.log(`hi ,my name is ${this.name} 
      Do you like to have a drink with me ? ${this.isSportsCar}`);
  },
};

const p2 = Object.create(car, {
  color: {
    writable: true,
    configurable: true,
    value: 'yellow',
  },
  type: {
    get: function () {
      return 'convertible';
    },
    set: function (value) {
      'change this car to', value;
    },
  },
});

// 打印一下 p2 你会发现
// p2.__proto__===car
// 第二个参数中的对象直接添加在p2对象上
// https://cdn.clearlywind.com/blog-images/images/object.create.png

// 使用该方法声明对象和我们使用字面量定义有什么异同
var o = { a: 1 };
console.log(o);
// https://cdn.clearlywind.com/blog-images/images/js-object.jpg

/**
 * o 继承了对象Object上的所有方法，比如 toString ，valueOf() hasOwnProperty()等
 */

var a1 = Object.create({}, { a: '1' });
// a1 的 __proto__ 就是 {} ，所以 a1.__proto__.__proto__ 是 Object

// 所以，当我
var a2 = Object.create(Object.prototype, { a: '1' });
// a2的__proto__ 就是 Object.prototype

/**
 * 所以 Object.create(null)和{}的却别就出来了
 *
 * 当使用 {} 声明的对象，判断对象是否存在
 */

// 什么时候使用 Object.create(null)
// 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
// 想节省 hasOwnProperty 带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

// for in 变量原型链上的是属性吗

var a3 = {
  a: 'a',
};
a3.prototype['b'] = 'b';

for (var key in a3) {
  console.log(key);
}
