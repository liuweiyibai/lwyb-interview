function require(path) {
	// 假设 有个load方法可以读取到path文件内容
	// var code = load(path)

	// 文件内容如下
	var code = 'function add(a, b) { return a + b }; module.exports = add'

	// 代码块内部的 module 是个形参，实参使我们定义的context对象，对象中有一个 exports 属性
	code = `(function(module){
    ${code}
  })(context)`

	let context = {}
  // new Function('参数',..., 最后一个参数是函数体)
	const run = new Function('context', code)
  // run 函数的结构如下：
	// function run(context) {
	// 	;(function (module) {
	// 		function add(a, b) {
	// 			return a + b
	// 		}
	// 		module.exports = add
	// 	})(context)
	// }

	console.log(run.toString())
	run(context,code)
  return context
}

console.log(require())
