////// 纯代码库: lib/params.js ///////

// 实现一个简单链式调用的效果

// 容器函数
const Container = function (x) {
	this.__value = x
}

Container.prototype.map = function (func: Function) {
	return Container.of(func(this.__value))
}

// 创建容器的方法
Container.of = x => new Container(x)

console.log(Container.of(3))
console.log(Container.of(4))

var add1 = function (num) {
	return num + 1
}
var add2 = function (num) {
	return num + 2
}

console.log(Container.of(3).map(add1).map(add2))
console.log(Container.of(4).map(add1).map(add2))
