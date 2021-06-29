# vue 基础面试题

1. 说说你对 vue 的理解
   完备的工程化开发、数据驱动视图、组件化开发、指令系统、基于模板开发、虚拟 dom 等

2. vue 和 react 的异同

   1. 相同点

      1. 都是组件化思想
      2. 都支持服务端渲染
      3. 都是基于虚拟 dom 对应渲染到真实 dom
      4. 都是数据驱动视图
      5. 都有 native 开发方案
      6. 都有自己的工程化方案

   2. 不同点
      1. 数据流向的不同。react 从诞生开始就推崇单向数据流，而 Vue 是双向数据流
      2. 数据变化的实现原理不同。react 使用的是不可变数据，而 Vue 使用的是可变的数据
      3. 组件化通信的不同。react 中我们通过使用回调函数来进行通信的，而 Vue 中子组件向父组件传递消息有两种方式：事件和回调函数
      4. diff 算法不同。react 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。Vue 使用双向指针，边对比，边更新 DOM

3. v-show 元素的显示和隐藏算是重排吗?

   添加或者删除可见的 dom 元素属于重排,v-show 是设置了 css 的 display 属性，是算重排的

4. 说说你对 vue 和 jQuery 的理解

   jQuery 是以操作 dom 为主，做了数据处理之后还需要对 dom 进行操作。vue.js 是以操作数据为主，不操作 dom，也就是传说中的双向数据绑定，你只需要操作数据就好，dom 自动更新。这只是对初学者来说最大的不同。jQuery 只是一个类库，只是提供了很多的方法，不能算框架，而 vue.js 是一个框架，有一套完整的体系。

5. 什么是 vue 生命周期

   - vue 每个组件从被创建、渲染、更新、销毁各个流程间被调用的函数
   - 包括 beforeCreate created beforeMount mounted beforeDestory destory beforeUpdate updated

6. vue 生命周期的作用是什么
   方便开发者在各个生命周期做不同的事情，在各个生命周期都有对组件可以做的事情

   - beforeCreate 组件创建前，此时数据监测和初始化事件还未开始

   - created 组件创建后，完成数据监测，属性和方法的运算，初始化事件，`$el` 还没有，不可以访问 dom，真实 dom 不可访问

   - beforeMount 挂载真实 dom 前，在挂载开始前被调用，相关的 render 函数首次被调用，实例已经完成以下配置: 包括模板编译、把 data 里面的数据生成模板 html，此时组件还没有挂载到页面上

   - mounted 载入后，`$el` 可以访问到组件实例 dom，实例已经完成以下配置：将编译好的 HTML 内容替换 `$el` 指向的 dom 对象，完成组件 HTML 展示到真实页面上。

   - beforeUpdate（更新前），在数据更新之前调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。

   - updated（更新后），在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

   - beforeDestroy（销毁前），在实例销毁之前调用。实例仍然完全可用。

   - destroyed（销毁后），在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

7. 第一次页面加载会触发哪几个钩子

   - beforeCreated created beforeMounted mounted

8. 简述每个周期具体适合哪些场景

   1. created:进行 ajax 请求异步数据的获取、初始化数据
   2. mounted:挂载元素 dom 节点的获取
   3. nextTick:针对单一事件更新数据后立即操作 dom
   4. updated:任何数据的更新，如果要做统一的业务逻辑处理
   5. watch:监听数据变化，并做相应的处理

9. created 和 mounted 的区别

   - created 数据监听已经完成，属性的方法和运算已经完成，watch 事件回调完成，`$el` 属性不可访问，dom 不可访问，数据没有在 dom 上进行渲染
   - mounted ，此实例 `dom` 节点被渲染，`dom` 被渲染，可以访问到 `$el`

10. vue 获取数据在哪个周期函数

    created 中，如果需要操作 dom 节点，可在 mounted 中进行

11. 父子组件渲染顺序

    父组件 beforeMounted 到 mounted 这个过程是子组件 beforeCreated 到 mounted 的过程

12. 子组件更新父组件会更新吗，如果会，更新顺序是什么

    会更新，更新顺序是: 子组件 beforeUpdate->父组件 beforeUpdate->子组件 updated->父组件 updated

13. 哪个生命周期可以可以获取真实 dom

    mounted

14. 修改 data 里的数据会触发哪些生命周期

    两个更新的生命周期函数，updated 和 beforeupdate

15. 为什么 data 是一个函数

    函数创建新的作用域，避免组件复用时 data 被共享

## 路由面试题

1. vue-router 是什么?它有哪些组件

   是 vue 提供的路由访问工具，包括 router-view router-link，分别用来显示路由，以及切换路由

2. active-class 是哪个组件的属性？

   router-link 的属性，当当前路访问路由和 router-link 指向路由一样时会触发

3. 怎么定义 vue-router 的动态路由? 怎么获取传过来的值

   `addRoutes` 还是 `/:id` 这种参数，如果是 `:id`，可以在定义路由是定义 prop 选项，在组件中可以通过 props 的方式访问，或者也可以在组件内部通过`$route.params`

4. vue-router 有哪几种导航钩子?

   全局和组件钩子，包括全局钩子

5. 组件 route 和 router 的区别

   route 是组件路由对象，获取当前路由实例，包括当前路由的参数等。router 是全局路由对象，包括提供全局路由跳转等。

6. vue-router 响应路由参数的变化

   beforeRouteUpdate 或者 watch `$route` 对象

7. vue-router 传参

   query 方式和 params 方式

8. vue-router 的两种模式

   history 和 hash，区别体现在 url 的显示，是否需要后端配合以及兼容性

9. vue-router 实现路由懒加载（ 动态加载路由 ）

   通过 `import` 的方式动态引入，同时使用 webpack 魔法注释命名拆包，或者使用 webpack 提供的 `require.ensure`

## vue 常见面试题

1. v-if 和 v-show 区别

   是否在 dom 树中产生真实的 dom。v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换

   v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染

2. 为什么 v-for 要加 key

3. 为什么 vue 不建议 v-for 不能和 v-if 一起使用

4. vue 优点

5. 如何让 CSS 只在当前组件中起作用

   scope

6. 如何获取 dom

7. 说出几种 vue 当中的指令和它的用法？

8. vue-loader 是什么？使用它的用途有哪些？

9. v-for 中的 key 是什么作用

10. axios 及安装

11. axios 解决跨域

12. v-modal 的使用

13. scss 的安装以及使用

14. 请说出 vue-cli 项目中 src 目录每个文件夹和文件的用法？

15. 分别简述 computed 和 watch 的使用场景

    computed 可以简化多个组件内变量的判断条件，比如我有个 div，它需要满足三个变量的条件，可以通过 computed 简化，computed 可以帮助 watch 实现监听多个变量的效果
    watch 主动监听某个变量，然后出发某个函数，常见的监听 props, computed 可以简化模板中的运算

    [参考地址](https://zhuanlan.zhihu.com/p/36929468)

    ```js
    computed:{
      obj(){
        const {a,b} = this
        return {a,b}
      }
    },
    watch:{
      obj(){}
    }
    ```

16. v-on 可以监听多个方法吗

    可以

    ```html
    <div v-on="{click:''}"></div>
    <script>
      export default {
        methods: {},
      };
    </script>
    ```

17. `$nextTick` 的使用

    dom 响应数据更新，dom 更新结束后，下一轮事件循环的回，向下使用 Promise setTimeout、setImmdeiate、Mutationobserve 等 api 实现

18. vue 组件中 data 为什么必须是一个函数

    形成作用域，组件多次复用时达到内部状态隔离的目的

19. vue 事件对象的使用

    $event 绑定事件时函数第一个参数就是 $event

20. 渐进式框架的理解

    就是你可以只是用我的一部分功能，比如 observe，比如事件机制，不一定使用整个框架，vue3 中支持 treeshaking

21. 单页面应用和多页面应用区别及优缺点

22. vue 中过滤器有什么作用及详解

23. v-if 和 v-for 的优先级

24. assets 和 static 的区别

    assets 目录中的文件会被 webpack loader 处理，static 不会，static 会被直接复制到打包目录

25. vue 常用的修饰符
26. 数组更新检测

    劫持几个修改原数组的方法`pop shift unshift push splice reverse sort`

27. Vue.set 视图更新

    就是触发数据的响应式更新

28. 自定义指令详解

    看文档吧

29. 引进组件的步骤

    引入，使用，使用可以通过插件注册、组件注册的方式，主要是看通过什么接口定义

30. Vue-cli 打包命令是什么？打包后导致路径问题，应该在哪里修改

    是否二级目录，修改 publicPath 和 vue-router 的 base

31. 跨组件双向数据绑定

    .sync 的实现，还是自定义 v-model

32. delete 和 Vue.delete 删除数组的区别

    delete 可能无法触发视图更新，Vue.delete 一定会触发视图更新

33. SPA 首屏加载慢如何解决

    首屏主要是对入口文件进行瘦身，路由懒加载、组件按需加载。具体包括 gzip 压缩，剔除 log 日志，使用 svg 或者 雪碧图，第三方库、静态资源 cdn，利用 http 缓存，路由懒加载，splitChunks 提取公共代码。

    其中按需引入是在 babel 编译过程中，按需只引入相关代码。
    tree shaking 是在 webpack 打包阶段，移除 JavaScript 上下文中的未引用代码。

    全量引入 elementui，和按需引入 elemnet-ui

    splitChunks 配置，将多次用到的包抽离出来放到公共依赖文件，避免重复加载。

    webpack5 增量构建

34. vue-router 跳转和 location.href 有什么区别

    vue-router 跳转无状态刷新更改
    location.href 修改页面会进行刷新

    vue-router 跳转是内部 match 后渲染对应组件
    location.href 是刷新页面后重新执行了 vue-router 的逻辑渲染匹配出来的页面

35. vue slot
36. 你们 vue 项目是打包了一个 js 文件，一个 css 文件，还是有多个文件？

    多个，打包到一个文件会导致体积过大，网站体验不好

37. Vue 里面 router-link 在 pc 上有用，在安卓上没反应怎么解决？

    vue-router 兼容性问题，使用 babel-polyfill 解决

38. vue2 中注册在 router-link 上事件无效解决方法

    使⽤@click.native。原因：router-link 会阻⽌ click 事件，.native 指直接监听⼀ 个原⽣事件。

39. RouterLink 在 IE 和 Firefox 中不起作用（路由不跳转）的问题

    只⽤ a 标签，不使用 button 标签；
    使⽤ button 标签和 Router.navigate ⽅法

40. axios 的特点有哪些

    支持 promise 方式发送请求，请求拦截器

41. 请说下封装 vue 组件的过程？

    高内聚低耦合结合业务，定义组件属性，是否使用 ts，哪种 css 方案，打包工具选择，lint 验证、prettier、持续集成等，单元测试

42. vue 各种组件通信方法（父子 子父 兄弟 爷孙 毫无关系的组件）

    $emit 和 props 属性
    $attr $props $listeners 属性和事件透传
    inject 和 provide 跨组件
    vuex
    $parent $children ref

43. vue mock 数据

    通过 dev-server 的 before 钩子和 mockjs 生成的数据来进行数据 mock

44. vue 初始化页面闪动问题

    使用 vue 开发时，在 vue 没有初始化之前，div 是不归 vue 管的，所以我们写的代码在没有解析完的情况下，会出现一个花屏闪烁的问题，这个时候就可以在 css 里写一个

    [v-cloak]{display:none}

    如果没有彻底解决，可以再根元素上加

45. vue 禁止弹窗后的屏幕滚动

    ```js
    export default {
      methods: {
        //禁止滚动
        stop() {
          var mo = function (e) {
            e.preventDefault();
          };
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', mo, false);
          // 禁止页面滑动
        },
        /***取消滑动限制***/
        move() {
          var mo = function (e) {
            e.preventDefault();
          };
          document.body.style.overflow = ''; //出现滚动条
          document.removeEventListener('touchmove', mo, false);
        },
      },
    };
    ```

46. vue 更新数组时触发视图更新的方法

    通过 `$set` 或者将该变量重新赋值

47. vue 常用的 UI 组件库

48. vue 如何引进本地背景图片

    webpack alias 使用，或者绕过 webpack 构建直接引入

49. vue 如何引进 sass

    搭建项目时使用，或者安装 dart-sass，

50. vue 修改打包后静态资源路径的修改

    assetsDir 和 outputDir 还是 publicPath

51. 组件封装

    - props 验证、默认值
    - 插槽，react 的话就是 children 和 React.Children

52. vue 和 react 区别

    相同点，都是基于 vdom 生成 dom 元素，都支持组件化开发

    不同点：

    1. 单文件组件模板(sfc single file component) vs jsx，vue 内置提供了一些指令完成条件判断以及循环，而 jsx 支持 js 特性。同一个文件中可以声明多个组件
    2. 更新状态的机制
       1. vue 双向绑定，
       2. react 只能通过 setState ，props 进行状态更新
    3. 组件 vue 中有全局组件的概念
    4. 在 vue 中 this 对于全局 方法 mixin 的提示上，所有属性方法耦合在 this 上
    5. 模板调试时效率要低于 jsx
    6. react 的更新机制是以组件更新，vue 由于双向绑定机制，
    7. vue 模板中无法使用 this 之外的方法，当前文件上下文方法没办法直接使用

    首先，下面会说到的 template 中无法很好 linting、type 推断，代码迁移过去很多 bug 无法及时发现。其次代码迁移很大部分都是 js 逻辑的迁移（这个更重要），迁移到 vue 中，你需要填鸭式拆分原先代码，放到 computed、menthods 中，工作量不小且代码和 Vue 强绑定。最后，原代码 class、@click 这些东西，有现代化的编辑器，批量 replace 成 className、onClick 不是很简单的事情吗？

53. vue props 会触发哪个生命周期函数

    如果 porps 或者 porps 关联的 computed 绑定到 dom 上，会触发 beforeUpdate 和 updated

54. vue3 为什么会使用 proxy 来代替 object.defineproperty

    2.0 的问题，给对象新增属性时，obj.a = 10 无法被拦截到
    给数组按照索引赋值，通过修改 length 的方式修改数组都无被拦截到，都需要用到`$set` 来手动解决

    但是使用 proxy 就可以完美解决上述问题

55. vue3 是如何通过 proxy 来代理数据的

56. 谈谈你对 keep-alive 的理解

    缓存每次被激活的第一个组件，判断组件是否在 exclude 里，如果在则取缓存里的，如果不在则放入缓存，缓存基于 lru 算法规则，即最近最少使用，具体缓存实现是将最近访问的节点 push 到数组并且删除其原来在的位置，然后在数组前面删除，当数组超过 max 值时，则默认删除第一个。

57. vue-ssr 原理，不依赖框架如何实现

    vue-server-render 基于服务端将 vue 代码解析为 html 文件，浏览器直接请求 html 文件

58. vuex 是什么？怎么使用？哪种功能场景使用它？

    vuex 是专门为 vue.js 应用程序开发的状态管理工具，当我的组件信息、有一些数据需要响应式的在页面上展示时

59. vuex 有哪几种属性

    state getter mutation actions

60. vue.js 中 ajax 请求代码应该写在组件的 methods 中还是 vuex 的 actions 中？
61. Vuex 中如何异步修改状态
62. Vuex 中 actions 和 mutations 的区别

    同步异步，纯函数

63. 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

    纯函数，给定同样的输入返回同样的输出，可预测性。

64. vuex 的实现原理，vuex 中 state 如何使视图更新

    同 data 一样，存在依赖收集，数据更新会更新到视图上

65. 简单说一下 vuex 和 redux 的区别

    分别是 react 和 vue 的全局共享状态插件，但是 react 和 redux 并不是强相关，redux 也可以用在其他框架中，需要做集成。而 vuex 是和 vue 强相关的，redux 是讲究函数式变成，所以他的 actions 异步操作需要由第三方中间件来做，vuex 自带 mutations 和 action 分别做同步异步操作

66. computed 原理

    computed 对依赖发生变化时重新计算，根据一个内部变量，当依赖数据变化时将内部变量设置为 true，重新计算

67. 简单说说 vue 插槽

    - 创建组件虚拟节点时，会将组件儿子的虚拟节点保存起来。当初始化组件时，通过插槽属性将儿子进行分类 {a:[vnode],b[vnode]}

    - 渲染组件时会拿对应的 slot 属性的节点进行替换操作。（插槽的作用域为父组件）

68. 说下双向绑定原理

    在初始化 vue 实例时，遍历 data 这个对象，给每一个键值对利用 Object.definedProperty 对 data 的键值对新增 get 和 set 方法，利用了事件监听 DOM 的机制，让视图去改变数据。通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化->视图更新。

69. 前端路由原理

    前端根据 url 变化显示不同视图

70. vue data 更新过程，是如何触发到 dom 的

    渲染组件时，会通过 vue.extend() 方法构建子组件的构造函数，并进行实例化。最终手动调用 $mount() 进行挂载。更新组件时会进行 patchVnode 流程，核心就是 diff 算法。

71. vue 中 $set 和 $delete 实现原理

    $delete(target,value)
    $set(target,key,value)

    [参考链接](https://juejin.cn/post/6844903834003701768)

    基于源码理解，$delete 会判断对对象操作还是数组，如果是数组，则调用 splice 方法删除数组元素，splice 会触发响应式更新，完后 return 代码
    如果是对象，则判断属性是否存在对象上，对象是不是 vue 实例，如果都不满足，则使用 delete key.value 删除后调用 target 上的 observe 对象通知依赖进行更新

    $set，判断 target 是数组还是对象，当是数组时，key 就是索引，比较 key 和 target 的 length 的大小，将 target.length 设置为大值，完后通过 splice 在`target[key]` 位置替换或者插入元素。如果是对象，如果 target 是响应式的，并且 key 在 target 上，直接`target[key] = value` 进行赋值，如果不是响应式的，则通过 `defineReactive` 定义为响应式然后通知依赖更新

72. vue 实例挂载的过程

    1. new Vue 的时候调用会调用 `_init` 方法
    2. 定义 `$set`、`$get` 、`$delete`、`$watch` 等方法
    3. 定义 `$on`、`$off`、`$emit`、`$off` 等事件
    4. 定义 `_update`、`$forceUpdate`、`$destroy` 生命周期
    5. 调用 `$mount` 进行页面的挂载

    挂载的时候主要是通过 mountComponent 方法

    定义 updateComponent 更新函数

    执行 render 生成虚拟 DOM

    `_update` 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

73. vue 性能优化

    编码和工程化方向，vue 编码时需要注意,尽量减少 data 中的数据，data 中的数据不需要双向绑定的使用 object.freeze，减少深层级嵌套；v-if 和 v-for 不能连用；灵活使用 keep-alive 缓存组件和 component 动态组件，在更多的情况下，使用 v-if 替代 v-show，key 保证唯一，使用路由懒加载、异步组件。
    工程化基于 webpack，减少构建体积，资源 cdn、gzip、splitChunk 拆包、第三方库按需引入

74. vue2 中为什么要求组件模板只能有一个根元素？

75. 在 vue 中 watch 和 created 哪个先执行？为什么？

    在 wacth 监控数据时，设置 immediate：true；会优先执行 watch,created 后执行;

76. vue 中 mixins 和 extends 有什么区别？
    extend 用于创建 vue 实例
    mixins 可以混入多个 mixin，
    extends 只能继承一个,mixins 类似于面向切面的编程（AOP），extends 类似于面向对象的编程,
    优先级 Vue.extend>extends>mixins

77. vue mixins 使用场景

    当多个组件使用到公共逻辑，包括共用的 method、data、生命周期等

78. 在 vue 中 created 与 activated 有什么区别？

    created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

    activated()：是在路由设置`<keep-alive></keep-alive>`时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用。

79. 为什么在 v-for 中的 key 不推荐使用随机数或者 index 呢？那要怎么使用才比较好呢？

    因为在插入数据或者删除数据的时候，会导致后面的数据的 key 绑定的 index 变化，进而导致从新渲染，效率会降低

80. 如何批量引入组件？

    webpack 中 require.context 批量导入某个目录下下的所有文件

81. 跟 keep-alive 有关的生命周期是哪些？描述下这些生命周期

    activated 和 deactivated，keep-alive 的生命周期
    1.activated： 页面第一次进入的时候，钩子触发的顺序是 created->mounted->activated
    2.deactivated: 页面退出的时候会触发 deactivated，当再次前进或者后退的时候只触发 activated

82. vue 中怎么重置 data？

    ```js
    Object.assign(); // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象, 此方法是浅拷贝
    this.$data; // 获取当前状态下的data
    this.$options.data(); // 获取该组件初始状态下的 data。
    Object.assign(this.$data, this.$options.data());
    ```

83. Vue.observable 你有了解过吗？

    类轻量级 vuex，可以用作状态管理。可以让一个对象实现响应式，实现依赖收集更新到视图层

84. vue 如果想扩展某个现有的组件时，怎么做呢？

    使用 Vue.extend 直接扩展
    使用 Vue.mixin 全局混入
    HOC 封装

85. 你了解 vue 的 diff 算法吗
86. vue diff 和 react diff 的区别

87. vue 如何优化首页的加载速度？

    服务端渲染或者减少入口文件引入大小，包括异步引入组件，cdn 加载，图片懒加载，域名拆分

88. 你知道 nextTick 的原理吗？

    提到 DOM 的更新是异步执行的，只要数据发生变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。简单来说，就是当数据发生变化时，视图不会立即更新，而是等到同一事件循环中所有数据变化完成之后，再统一更新视图。

    微任务向宏任务的降级处理。

89. 说说你对 proxy 的理解

    vue 的数据劫持有两个缺点:
    1、无法监听通过索引修改数组的值的变化
    2、无法监听 object 也就是对象的值的变化
    所以 vue2.x 中才会有 `$set` 属性的存在

    proxy 是 es6 中推出的新 api，可以弥补以上两个缺点，所以 vue3.x 版本用 proxy 替换 object.defineproperty

90. 说说你觉得认为的 vue 开发规范有哪些？

    看一下 vue 风格指南

91. vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢?

    主要区别看请求中是否涉及到 dom 操作，比如图表渲染

92. 说说你对 extend 的理解

    extend：创建、复用组件，手动挂载组件，使用 extend 时，data 选项必须是函数

93. 说说你对 keep-alive 的理解是什么？

    保留内部组件状态，避免第二次加载时重复渲染，内置 actived,beforeActived 钩子，使用 lru 算法缓存组件 options

94. vue scoped 属性作用？实现原理？

    达到 css 样式不互相污染的作用，原理是依赖 postcss 给每一个 dom 元素增加独一无二的属性

    [参考链接](https://blog.csdn.net/fujiaran/article/details/108760419)

95. 怎么看待 virtual dom？

    通过虚拟 dom 树在更新时找出差异，来进行真实 dom 的最小更新，主要是为了跨平台方便

96. ast 语法树了解吗？

97. vue-loader 做了哪些事情？

98. vue diff？

    时间复杂度，vue 对 diff 算法做了优化转为 o(n)复杂度，具体表现为：

    - 最小量更新，key 很重要。这个可以是这个节点的唯一标识，告诉 diff 算法，在更改前后它们是同一个 DOM 节点，所以 v-for 为什么要有 key ，没有 key 会暴力复用，举例子的话随便说一个比如移动节点或者增加节点（修改 DOM），加 key 只会移动减少操作 DOM。
    - 只有是同一个虚拟节点才会进行精细化比较，否则就是暴力删除旧的，插入新的。
    - 只进行同层比较，不会进行跨层比较。
    - diff 算法的优化策略：四种命中查找，四个指针
      1. 旧前与新前（先比开头，后插入和删除节点的这种情况）
      2. 旧后与新后（比结尾，前插入或删除的情况）
      3. 旧前与新后（头与尾比，此种发生了，涉及移动节点，那么新前指向的节点，移动到旧后之后）
      4. 旧后与新前（尾与头比，此种发生了，涉及移动节点，那么新前指向的节点，移动到旧前之前）

99. vue computed 和 watch 区别？

    都可以监听 data 或者 props 并且执行对应逻辑，watch 适合监听数据后执行某些逻辑，computed 适合简化 data 和 props 的计算，因为其有缓存结果的特性，当依赖不发生变化时，结果不会重新计算，如果当一个数据依赖其他 props 或者 data 的计算可以使用 computed

- computed 怎么实现的缓存（dirty）？

  布尔值做标志位，当依赖变化时修改，然后触发后面重新计算

- vue3 双向数据绑定实现？

- createRender？和 vue2 有哪些不同，提到了函数式编程

- 对 MVC（react）MVVM（vue）的了解?

  vue 数据驱动视图变化，model-view-viewmodel，model 表示数据层，view 视图层，viewmodel 是视图和数据间桥梁。

- vue 静态标记了解过吗？

  vue 静态标记会在解析 template 时标记静态节点、比如没有指令的 html 标签、文本节点等，好在更新时跳过这些节点

- vue 中事件绑定原理
  直接绑定到目标元素

- 自定义 model

  组件内 model 选项，可以实现自定义 model，model 里面放上 prop 和对应事件

- 如何从真实 dom 到虚拟 dom

  从 template 到 js 的编译过程
