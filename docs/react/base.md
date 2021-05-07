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

什么时候使用状态管理器？
render 函数中 return 如果没有使用()会有什么问题？
componentWillUpdate 可以直接修改 state 的值吗？
说说你对 React 的渲染原理的理解
什么渲染劫持？
React Intl 是什么原理？
你有使用过 React Intl 吗？
怎么实现 React 组件的国际化呢？
说说 Context 有哪些属性？
怎么使用 Context 开发组件？
为什么 React 并不推荐我们优先考虑使用 Context？
除了实例的属性可以获取 Context 外哪些地方还能直接获取 Context 呢？
childContextTypes 是什么？它有什么用？
contextType 是什么？它有什么用？
Consumer 向上找不到 Provider 的时候怎么办？
有使用过 Consumer 吗？
在 React 怎么使用 Context？
React15 和 16 别支持 IE 几以上？
说说你对 windowing 的了解
举例说明 React 的插槽有哪些运用场景？
你有用过 React 的插槽(Portals)吗？怎么用？
React 的严格模式有什么用处？
React 如何进行代码拆分？拆分的原则是什么？
React 组件的构造函数有什么作用？
React 组件的构造函数是必须的吗？
React 中在哪捕获错误？
React 怎样引入 svg 的文件？
说说你对 Relay 的理解
在 React 中你有经常使用常量吗？
为什么说 React 中的 props 是只读的？
你有使用过 formik 库吗？说说它的优缺点
你有用过哪些 React 的表单库吗？说说它们的优缺点
如果组件的属性没有传值，那么它的默认值是什么？
可以使用 TypeScript 写 React 应用吗？怎么操作？
super()和 super(props)有什么区别？
你有使用过 loadable 组件吗？它帮我们解决了什么问题？
你有使用过 suspense 组件吗？它帮我们解决了什么问题？
怎样动态导入组件？
如何给非控组件设置默认的值？
怎么在 React 中引入其它的 UI 库，例如 Bootstrap
怎样将事件传递给子组件？
怎样使用 Hooks 获取服务端数据？
使用 Hooks 要遵守哪些原则？
render 方法的原理你有了解吗？它返回的数据类型是什么？
useEffect 和 useLayoutEffect 有什么区别？
在 React 项目中你用过哪些动画的包？
React 必须使用 JSX 吗？
自定义组件时 render 是可选的吗？为什么？
需要把 keys 设置为全局唯一吗？
怎么定时更新一个组件？
React 根据不同的环境打包不同的域名？
使用 webpack 打包 React 项目，怎么减小生成的 js 大小？
在 React 中怎么使用 async/await？
你阅读了几遍 React 的源码？都有哪些收获？你是怎么阅读的？
什么是 React.forwardRef？它有什么作用？
写个例子说明什么是 JSX 的内联条件渲染
在 React 中怎么将参数传递给事件？
React 的事件和普通的 HTML 事件有什么不同？
在 React 中怎么阻止事件的默认行为？
你最喜欢 React 的哪一个特性（说一个就好）？
在 React 中什么时候使用箭头函数更方便呢？
你最不喜欢 React 的哪一个特性（说一个就好）？
说说你对 React 的 reconciliation（一致化算法）的理解
使用 PropTypes 和 Flow 有什么区别？
怎样有条件地渲染组件？
在 JSX 中如何写注释？
constructor 和 getInitialState 有不同？
写例子说明 React 如何在 JSX 中实现 for 循环
为什么建议 Fragment 包裹元素？它的简写是什么？
你有用过 React.Fragment 吗？说说它有什么用途？
在 React 中你有遇到过安全问题吗？怎么解决？
React 中如何监听 state 的变化？
React 什么是有状态组件？
React v15 中怎么处理错误边界？
React Fiber 它的目的是解决什么问题？
React 为什么不要直接修改 state？如果想修改怎么做？
create-react-app 有什么好处？
装饰器(Decorator)在 React 中有什么应用？
使用高阶组件(HOC)实现一个 loading 组件
如何用 React 实现滚动动画？
说出几点你认为的 React 最佳实践
你是如何划分 React 组件的？
举例说明如何在 React 创建一个事件
如何更新组件的状态？
怎样将多个组件嵌入到一个组件中？
React 的 render 中可以写{if else}这样的判断吗？
React 为什么要搞一个 Hooks？
React Hooks 帮我们解决了哪些问题？
使用 React 的 memo 和 forwardRef 包装的组件为什么提示 children 类型不对？
有在项目中使用过 Antd 吗？说说它的好处
在 React 中如果去除生产环境上的 sourcemap？
在 React 中怎么引用 sass 或 less？
组件卸载前，加在 DOM 元素的监听事件和定时器要不要手动清除？为什么？
为什么标签里的 for 要写成 htmlFor 呢？
状态管理器解决了什么问题？什么时候用状态管理器？
状态管理器它精髓是什么？
函数式组件有没有生命周期？为什么？
在 React 中怎么引用第三方插件？比如说 jQuery 等
React 的触摸事件有哪几种？
路由切换时同一组件无法重新渲染的有什么方法可以解决？
React16 新特性有哪些？
你有用过哪些 React 的 UI 库？它们的优缺点分别是什么？

<div onClick={handlerClick}>单击</div>和<div onClick={handlerClick(1)}>单击</div>有什么区别？
在React中如何引入图片？哪种方式更好？
在React中怎么使用字体图标？
React的应用如何打包发布？它的步骤是什么？
ES6的语法'...'在React中有哪些应用？
如何封装一个React的全局公共组件？
在React中组件的props改变时更新组件的有哪些方法？
immutable的原理是什么？
你对immutable有了解吗？它有什么作用？
如何提高组件的渲染效率呢？
在React中如何避免不必要的render？
render在什么时候会被触发？
写出React动态改变class切换组件样式
React中怎么操作虚拟DOM的Class属性？
为什么属性使用className而不是class呢？
请说下react组件更新的机制是什么？
怎么在JSX里属性可以被覆盖吗？覆盖的原则是什么？
怎么在JSX里使用自定义属性？
怎么防止HTML被转义？
经常用React，你知道React的核心思想是什么吗？
在React中我们怎么做静态类型检测？都有哪些方法可以做到？
在React中组件的state和setState有什么区别？
React怎样跳过重新渲染？
React怎么判断什么时候重新渲染组件呢？
什么是React的实例？函数式组件有没有实例？
在React中如何判断点击元素属于哪一个组件？
在React中组件和元素有什么区别？
在React中声明组件时组件名的第一个字母必须是大写吗？为什么？
举例说明什么是高阶组件(HOC)的反向继承？
有用过React Devtools吗？说说它的优缺点分别是什么？
举例说明什么是高阶组件(HOC)的属性代理？
React的isMounted有什么作用？
React组件命名推荐的方式是哪个？为什么不推荐使用displayName？
React的displayName有什么作用？
说说你对React的组件命名规范的理解
说说你对React的项目结构的理解
React16废弃了哪些生命周期？为什么？
怎样在React中开启生产模式？
React中getInitialState方法的作用是什么？
React中你知道creatClass的原理吗？
React中验证props的目的是什么？
React中你有使用过getDefaultProps吗？它有什么作用？
React中你有使用过propType吗？它有什么作用？
React中怎么检验props？
React.createClass和extends Component的区别有哪些？
高阶组件(HOC)有哪些优点和缺点？
给组件设置很多属性时不想一个个去设置有什么办法可以解决这问题呢？
React16跟之前的版本生命周期有哪些变化？
怎样实现React组件的记忆？原理是什么？
创建React动画有哪些方式？
为什么建议不要过渡使用Refs？
在React使用高阶组件(HOC)有遇到过哪些问题？如何解决？
在使用React过程中什么时候用高阶组件(HOC)？
说说React diff的原理是什么？
React怎么提高列表渲染的性能？
使用ES6的class定义的组件不支持mixins了，那用什么可以替代呢？
为何说虚拟DOM会提高性能？
React的性能优化在哪个生命周期？它优化的原理是什么？
你知道的React性能优化有哪些方法？
举例说明在React中怎么使用样式？
React有哪几种方法来处理表单输入？
什么是浅层渲染？
你有做过React的单元测试吗？如果有，用的是哪些工具？怎么做的？
在React中什么是合成事件？有什么用？
使用React写一个todo应用，说说你的思路
React16的reconciliation和commit分别是什么？
React的函数式组件有没有生命周期？
useState和this.state的区别是什么？
请说说什么是useImperativeHandle？
请说说什么是useReducer？
请说说什么是useRef？
请说说什么是useEffect？
举例说明useState
请说说什么是useState？为什么要使用useState？
请描述下你对React的新特性Hooks的理解？它有哪些应用场景？
说说你对Error Boundaries的理解
说说你对Fiber架构的理解
说说你是怎么理解React的业务组件和技术组件的？
为什么建议setState的第一个参数是callback而不是一个对象呢？
展示组件和容器组件有什么区别？
Mern和Yeoman脚手架有什么区别？
你有在项目中使用过Yeoman脚手架吗？
你有在项目中使用过Mern脚手架吗？
shouldComponentUpdate方法是做什么的？
怎样在React中使用innerHTML？
你有写过React的中间件插件吗？
React的中间件机制是怎么样的？这种机制有什么作用？
React中你用过哪些第三方的中间件？
不用脚手架，你会手动搭建React项目吗？
请说说React中Portal是什么？
React中修改prop引发的生命周期有哪几个？
React多个setState调用的原理是什么？
React中调用setState会更新的生命周期有哪几个？
React中setState的第二个参数作用是什么呢？
React中的setState是同步还是异步的呢？为什么state并不一定会同步更新？
React中的setState批量更新的过程是什么？
React中的setState执行机制是什么呢？
在React中遍历的方法有哪些？它们有什么区别呢？
请说说你对React的render方法的理解
props.children.map和js的map有什么区别？为什么优先选择React的？
有用过React的严格模式吗？
React中的setState和replaceState的区别是什么？
React中的setState缺点是什么呢？
有用过React的Fragment吗？它的运用场景是什么？
React组件间共享数据方法有哪些？
React的状态提升是什么？使用场景有哪些？
简单描述下你有做过哪些React项目？
在构造函数中调用super(props)的目的是什么？
你是如何学习React的？
从旧版本的React升级到新版本的React有做过吗？有遇到过什么坑？
你用过React版本有哪些？
有用过React的服务端渲染吗？怎么做的？
React的mixins有什么作用？适用于什么场景？
React怎么拿到组件对应的DOM元素？
请描述下事件在React中的处理方式是什么？
JSX和HTML有什么区别？
React的书写规范有哪些？
create-react-app创建新运用怎么解决卡的问题？
使用React的方式有哪几种？
说说你对reader的context的理解
同时引用这三个库React.js、React-dom.js和babel.js它们都有什么作用？
你知道Virtual DOM的工作原理吗？
你阅读过React的源码吗？简要说下它的执行流程
React中怎样阻止组件渲染？
React非兄弟组件如何通信？
React兄弟组件如何通信？
React非父子组件如何通信？
React父子组件如何通信？
React组件间的通信有哪些？
类组件和函数式组件有什么区别？
React自定义组件你写过吗？说说看都写过哪些？
React组件的state和props两者有什么区别？
React有几种构建组件的方式？可以写出来吗？
React中遍历时为什么不用索引作为唯一的key值？
React中的key有什么作用？
React中除了在构造函数中绑定this,还有别的方式吗？
在React中页面重新加载时怎样保留数据？
请描述下React的事件机制
怎样在React中创建一个事件？
在React中无状态组件有什么运用场景？
描述下在React中无状态组件和有状态组件的区别是什么？
写一个React的高阶组件(HOC)并说明你对它的理解
React中可以在render访问refs吗？为什么？
React中refs的作用是什么？有哪些应用场景？
请描述你对纯函数的理解？
受控组件和非受控组件有什么区别？
React中什么是非控组件？
React中什么是受控组件？
React中发起网络请求应该在哪个生命周期中进行？为什么？
说说React的生命周期有哪些？
说说你对“在React中，一切都是组件”的理解
写React你是用es6还是es5的语法？有什么区别？
浏览器为什么无法直接JSX？怎么解决呢？
在使用React过程中你都踩过哪些坑？你是怎么填坑的？
说说你喜欢React的原因是什么？它有什么优缺点？
如何解决引用类型在pureComponent下修改值的时候，页面不渲染的问题？
createElement与cloneElement两者有什么区别？
解释下React中Element 和Component两者的区别是什么？
解释下React中component和pureComponent两者的区别是什么？
React的虚拟DOM和vue的虚拟DOM有什么区别？
你觉得React上手快不快？它有哪些限制？
说说你对声明式编程的理解？
React与angular、vue有什么区别？
React是哪个公司开发的？
React是什么？它的主要特点是什么？
简要描述下你知道的React工作原理是什么？
在React中怎样改变组件状态，以及状态改变的过程是什么？
在React中你是怎么进行状态管理的？
React声明组件有哪几种方法，各有什么不同？
ReactNative
如何在React Native中设置环境变量？
请描述下Code Push的原理是什么？
React Native怎样查看日记？
React Native怎样测试？
React Native怎样调试？
React Native和React有什么区别？
有做过React Native项目吗？
React-Router
React-Router怎么获取历史对象？
React-Router怎么获取URL的参数？
在history模式中push和replace有什么区别？
React-Router怎么设置重定向？
React-Router 4中<Router>组件有几种类型？
React-Router 3和React-Router 4有什么变化？添加了什么好的特性？
React-Router的实现原理是什么？
React-Router 4的switch有什么用？
React-Router的路由有几种模式？
React-Router 4怎样在路由变化时重新渲染同一个组件？
React-Router的<Link>标签和<a>标签有什么区别？
React的路由和普通路由有什么区别？
请你说说React的路由的优缺点？
请你说说React的路由是什么？
Redux/Mobox
你有了解Rxjs是什么吗？它是做什么的？
在Redux中怎么发起网络请求？
Redux怎样重置状态？
Redux怎样设置初始状态？
Context api可以取代Redux吗？为什么？
推荐在reducer中触发Action吗？为什么？
Redux怎么添加新的中间件？
redux-saga和redux-thunk有什么本质的区别？
在React中你是怎么对异步方案进行选型的？
你知道redux-saga的原理吗？
你有使用过redux-saga中间件吗？它是干什么的？
Redux中异步action和同步action最大的区别是什么？
Redux和vuex有什么区别？
Redux的中间件是什么？你有用过哪些Redux的中间件？
说说Redux的实现流程
Mobx的设计思想是什么？
Redux由哪些组件构成？
Mobx和Redux有什么区别？
在React项目中你是如何选择Redux和Mobx的？说说你的理解
你有在React中使用过Mobx吗？它的运用场景有哪些？
Redux的thunk作用是什么？
Redux的数据存储和本地储存有什么区别？
在Redux中，什么是reducer？它有什么作用？
举例说明怎么在Redux中定义action？
在Redux中，什么是action？
在Redux中，什么是store？
为什么Redux能做到局部渲染呢？
说说Redux的优缺点分别是什么？
Redux和Flux的区别是什么？
Redux它的三个原则是什么？
什么是单一数据源？
什么是Redux？说说你对Redux的理解？有哪些运用场景？
Flux
请说说点击按钮触发到状态更改，数据的流向？
请描述下Flux的思想
什么是Flux？说说你对Flux的理解？有哪些运用场景？
