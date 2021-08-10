# js 高级程序设计

html 解析到 body 才开始渲染

## js 常见的错误类型

<https://blog.csdn.net/qqqq2013/article/details/73824431>

## 类型

隐式转换

isNaN() 会会先调用 valueOf() 然后再调用 toString 方法

数值类型 Number

类型转换会调用 valueOf 然后再调用 toString，再按照字符串规则转换

将表达式转为字符串会默认调用 toString

## 字符串

```js
// String.raw;
function template(a1, ...args) {
  log(a1, args);
}
tempalte`423423`;
String.raw`4234234`;

// @@types 带有 @@ 符号的内置属性都是不可写，不可枚举的

// for-await-of

car instanceof Car; // true
Car[Symbol.hasInstance](car); // es6 之后 instanceof 实际是调用该方法进行判断
// 这个属性定义在 Function 的原型上，因此默认在所有函数和类上都可以调用。由于 instanceof
// 操作符会在原型链上寻找这个属性定义，就跟在原型链上寻找其他属性一样，因此可以在继承的类上通
// 过静态方法重新定义这个函数：

class Car {
  static [Symbol.hasInstance]() {
    return false;
  }
}

// 返回一个新数组
var arr = [1, 2, 3];
var arr1 = Array.prototype.slice.call(arr); // 复制数组
```
