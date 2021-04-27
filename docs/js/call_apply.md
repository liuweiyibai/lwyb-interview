# 手写 js 中 call 和 apply 的实现

[参考链接](https://www.cnblogs.com/echolun/p/12144344.html)

```js
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];

  // 注意 i 从 1 开始，不算 context 参数
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
    // 到了 eval 的作用域中， eval 参数就是 arguments[1, argument.length-1]，可以保证参数的类型正确，在eval执行环境中对 arguments 通过索引直接取值传入
    // 因为直接 push arguments[i] 到数组里面的话，eval 解析时是没有引号的，都是按照变量去引用的，所以会报错找不到某个变量
  }

  // let args = [...arguments].slice(1);
  // let result = context.fn(...args);
  var result = eval('context.fn(' + args + ')'); // 执行fn
  delete context.fn; // 删除 fn
  return result;
};
let foo = {
  value: 1,
};
function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}
//表示bar函数的执行环境是foo，即bar函数里面的this代表foo,this.value相当于foo.value,然后给bar函数传递两个参数
bar.call2(foo, 'black', '18'); // black 18 1
```
