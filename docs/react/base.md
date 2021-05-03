# react 相关

- 什么是不可变数据

  在函数式编程中对已经初始化的变量是不可以更改的，每次更改都要创建一个新的变量。

- 为什么 react 使用不可变数据

  从 react 渲染组件性能考虑，使用旧数据创建新数据时，要保证旧数据同时可用，并且没有变化的部分还可用，目的是尽量减少不必要的渲染和重绘。 如果是简单的赋值给一个新的变量，新旧对象只是名称不同，不进行深比较 js 认为数据不变。其次，也会带来引入对象浅拷贝的问题，造成不可预测的展示值。这对 react 响应重新渲染造成了性能影响，或不能及时更新 dom。shouldComponentUpdate 是因为 state 值和 setState 值一样是也会触发更新，但是只到浅比较，对于深层结构没有效率。但是做深层拷贝很耗时，于是这才有了 Immutable 不可变数据，来提升组件 render 的效率。

- immerable 如何解决深拷贝占用大内存

  使用了结构共享，如果对象中只有一个节点发生变化，只修改这个节点和受影响的节点

## react 生命周期面试题

1. react 生命周期中，最适合与服务端进行数据交互的是哪个函数
2. 运行阶段生命周期调用顺序

   1. 创建时
      1. constructor
      2. getDerivedStateFromProps
         1. 组件每次获取 props 之后都会执行该函数，每次接受 props 之后都会返回一个新的对象作为 state，返回 null 则说明不需要更新 state，该函数内不可以访问 this，该函数输出完全由输入决定，需要在构造器内将需要使用的 props 在 state 中创建
      3. render
      4. componentDidMount
   2. 更新时
      1. setState props forUpdate 更新时
      2. getDividedStateFromProps
      3. shouleComponentUpdate 返回 true 或者 false
      4. render
      5. getSnapshotBeforeUpdate
      6. componentDidUpdate
   3. 销毁时
      1. componentWillUnmount

3. shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）

   用来判断当前组件是否需要更新，如果 props 和 state 发生变化，则更新，否则不更新，参数是 nextState 和 nextProps，主要作用是 react 性能优化，结合 immer 判断达到减少组件渲染次数的目的

4. 指出(组件)生命周期方法的不同
   生命周期参考 <https://segmentfault.com/a/1190000020348448>

   1. 挂载阶段：
      constructor(props): 实例化。
      static getDeriverdStateFromProps 从 props 中获取 state。
      render 渲染。
      componentDidMount: 完成挂载。

   2. 更新阶段：
      static getDeriverdStateFromProps 从 props 中获取 state。
      shouldComponentUpdate 判断是否需要重绘。
      render 渲染。
      getSnapshotBeforeUpdate 获取快照。
      componentDidUpdate 渲染完成后回调。

   3. 卸载阶段：
      componentWillUnmount 即将卸载。

   4. 错误处理：
      static getDerivedStateFromError 从错误中获取 state。
      componentDidCatch 捕获错误并进行处理。

### react 基础面试题

1. React 中 keys 的作用是什么？
   key 的作用是在 vdom 树中标识该节点，用来追踪那些元素被修改、添加、移除的辅助标识
2. React 中 refs 的作用是什么？

   访问组件组件实例或者 dom 实例

3. React 中有三种构建组件的方式

   类组件
   函数组件

4. 调用 setState 之后发生了什么？

5. setState 是同步还是异步的

   一般是异步的，因为 react 是批量更新的，同一个函数中执行多个 setState 时会合并后执行，并且以最后一次设置的属性为准
   当 setState 在微任务和宏任务中是同步的

6. react diff 原理（常考，大厂必考）

   react 16 之前，节点的遍历是深度优先遍历
   react 16 之后，链表，同层节点是单向链表

7. 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象

   因为 this.props 和 this.state 的更新可能是异步的，不能依赖他们的值去计算下一个 state

8. 除了在构造函数中绑定 this，还有其它方式吗

   调用时 bind 或者 采用箭头函数的方式，
   这是 js 的问题，es6 的 class 中当调用静态或原型方法时没有指定 this 的值，那么方法内的 this 值将被置为 undefined，es6 的 class 中是开启严格模式的
   箭头函数内没有 this，默认用父级作用域的 this。

9. setState 第二个参数的作用

   修改 state 完成之后的回调函数

10. 在构造函数中调用 super(props) 的目的是什么

    调用父类 Componet 的方法，可以在组件中访问到 props 等属性

11. 简述 flux 思想

    函数式编程思想

12. 在 React 当中 Element 和 Component 有何区别？
13. 描述事件在 React 中的处理方式。
14. createElement 和 cloneElement 有什么区别？
15. 如何告诉 React 它应该编译生产环境版本？
16. 受控组件 Component 与 非受控组件 Component 之间的区别是什么？
17. react 自测性能的手段

### react 组件面试题

1. 展示组件(Presentational component)和容器组件(Container component)之间有何不同
2. 类组件(Class component)和函数式组件(Functional component)之间有何不同
   1. 类组件有完整的生命周期，可以做的事情很多，有内建状态可以实现很多功能
   2. 函数组件只负责通过传入的 props 进行渲染
3. (组件的)状态(state)和属性(props)之间有何不同

   来源不同，都可以触发页面更新，组件内不能修改 props

4. 何为受控组件(controlled component)
5. 何为高阶组件(higher order component)

   mobx 中的 observe redux 中的 connect ，antd 中的 formcreated，根据组件传入的参数返回另一个组件

6. 应该在 React 组件的何处发起 Ajax 请求

   componentdidmount useeffect 中

7. react 中组件传值

   属性传递，属性透传

8. react 组件的划分业务组件技术组件？

### redux 面试题

1. redux 中间件
2. redux 有什么缺点
3. redux 的作用

   实现 app 状态共享，在将 state 方便在各个组件中进行访问

### react 性能比较面试题

1. vue 和 react 的区别
2. react 性能优化的方案
3. react 项目用过什么脚手架

   cra + react-app-rewired 、umi

4. 为什么要自定义配置

   配置第三方 cdn、修改 publicPath ，反代配置，修改 loader 配置，添加 loader，添加 webpack-plugin

5. 介绍一下 webpack
6. 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？
7. react fiber 架构
8. react hooks 原理

```js
const [state, setState] = useState(1);
// 为什么 const 定义的 state 可以被 setState 修改，因为每次调用setState后会重新执行该函数组件，所以相当于重新赋值
```

## react hooks

每次调用 setState 都会重新执行组件函数，每个 state 都是每个渲染中的常量

effect 在每次渲染也不一样，每一个版本 effect 中拿到的 state 和 props 都是属于那次渲染的 state

每一个组件内的函数（包括事件处理函数，effects，定时器或者 API 调用等等）会捕获某次渲染中定义的 props 和 state。

react 浏览器绘制后运行 effect， 在 dom 渲染完毕后运行 effect

React 只会根据 vdom 的 diff 结果更新 DOM 真正发生改变的部分

避免 effect 的重复调用，通过依赖，不变函数使用 useCallback
