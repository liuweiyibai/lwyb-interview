# 函数式编程

什么是纯函数：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

数组 slice 和 splice 纯函数和不纯函数，slice 会修改原数组，所以每次执行 slice 返回值都得会不同，splice 同样的参数总是会返回相同的结果。

什么是柯里化（curry）？curry 的概念很简单，只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

柯里化是函数式编程的工具，他能实现预加载函数、分步取值、避免重复传参、锁定函数运行环境等等功能。

函数组合？compose 函数，通过函数组合我们可以，一次性的合并多个处理函数，并且可以方便的改变函数的执行顺序。

声明式和命令式编程。

```js
// 比如我们使用一个命令式编程，编写登录，需要按照逻辑过程分别调用接口
// 命令式
var authenticate = function (form) {
 var user = toUser(form)
 return logIn(user)
}

// 声明式，但是使用声明式编程，可以通过组合函数来实现效果
// 用户验证就是 toUser 和 logIn 两种行为的组合
var authenticate = compose(logIn, toUser)
```

函数式编程，数据类型

通过管道把数据在一系列纯函数间传递，是书写函数式程序的方式。

了解 **JIT 优化相关。**

[阅读到了](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch9.html#chain-%E5%87%BD%E6%95%B0)
