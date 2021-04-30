# vue 基础面试题

## 生命周期

1. 什么是 vue 生命周期

   - vue 每个组件从被创建、渲染、更新、销毁各个流程间被调用的函数
   - 包括 beforeCreate created beforeMount mounted beforeDestory destory beforeUpdate updated

2. vue 生命周期的作用是什么
   方便开发者在各个生命周期做不同的事情，在各个生命周期都有对组件可以做的事情

   - beforeCreate 组件创建前，此时数据监测和初始化事件还未开始
   - created 组件创建后，完成数据监测，属性和方法的运算，初始化事件，`$el` 还没有，不可以访问 dom，真实 dom 不可访问
   - beforeMount 挂载真实 dom 前，在挂载开始前被调用，相关的 render 函数首次被调用，实例已经完成以下配置: 包括模板编译、把 data 里面的数据生成模板 html，此时组件还没有挂载到页面上
   - mounted 载入后，`$el` 可以访问到组件实例 dom，实例已经完成以下配置：将编译好的 HTML 内容替换 `$el` 指向的 dom 对象，完成组件 HTML 展示到真实页面上。
   - beforeUpdate（更新前），在数据更新之前调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。

   - updated（更新后），在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

   - beforeDestroy（销毁前），在实例销毁之前调用。实例仍然完全可用。

   - destroyed（销毁后），在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

3. 第一次页面加载会触发哪几个钩子

   - beforeCreated created beforeMounted mounted

4. 简述每个周期具体适合哪些场景

   1. created:进行 ajax 请求异步数据的获取、初始化数据
   2. mounted:挂载元素 dom 节点的获取
   3. nextTick:针对单一事件更新数据后立即操作 dom
   4. updated:任何数据的更新，如果要做统一的业务逻辑处理
   5. watch:监听数据变化，并做相应的处理

5. created 和 mounted 的区别

   - created 数据监听已经完成，属性的方法和运算已经完成，watch 事件回调完成，`$el` 属性不可访问，dom 不可访问，数据没有在 dom 上进行渲染
   - mounted ，此实例 `dom` 节点被渲染，`dom` 被渲染，可以访问到 `$el`

6. vue 获取数据在哪个周期函数

   created 中，如果需要操作 dom 节点，可在 mounted 中进行

7. 父子组件渲染顺序

   父组件 beforeMounted 到 mounted 这个过程是子组件 beforeCreated 到 mounted 的过程

8. 子组件更新父组件会更新吗，如果会，更新顺序是什么

   会更新，更新顺序是: 子组件 beforeUpdate->父组件 beforeUpdate->子组件 updated->父组件 updated

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

   route 是组件路由，router 是全局路由

6. vue-router 响应路由参数的变化

   beforeRouteUpdate 或者 watch `$route` 对象

7. vue-router 传参

8. vue-router 的两种模式

   history 和 hash，区别体现在 url 的显示，是否需要后端配合以及兼容性

9. vue-router 实现路由懒加载（ 动态加载路由 ）

   通过 `import` 的方式动态引入，同时使用 webpack 魔法注释命名拆包，或者使用 webpack 提供的 `require.ensure`

## vue 常见面试题

1. mvvm 框架是什么？

2. v-if 和 v-show 区别

   是否在 dom 树中产生真实的 dom

3. 为什么 v-for 要加 key

4. 为什么 vue 不建议 v-for 不能和 v-if 一起使用

5. vue 优点

6. vue 父组件组件，组件通信方案？

   ```js
   $emit 和 props 属性
   $attr $props $listeners 属性和事件透传
   inject 和 provide 跨组件
   vuex
   $parent $children
   ```

7. 如何让 CSS 只在当前组件中起作用

   scope

8. 如何获取 dom

9. 说出几种 vue 当中的指令和它的用法？

10. vue-loader 是什么？使用它的用途有哪些？

11. v-for 中的 key 是什么作用

12. axios 及安装

13. axios 解决跨域

14. v-modal 的使用

15. scss 的安装以及使用

16. 请说出 vue-cli 项目中 src 目录每个文件夹和文件的用法？

17. 分别简述 computed 和 watch 的使用场景

    computed 可以简化多个组件内变量的判断条件，比如我有个 div，它需要满足三个变量的条件，可以通过 computed 简化，computed 可以帮助 watch 实现监听多个变量的效果
    watch 主动监听某个变量，然后出发某个函数，常见的监听 props, computed 可以简化模板中的运算

    <https://zhuanlan.zhihu.com/p/36929468>

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

18. v-on 可以监听多个方法吗

    可以

    ```html
    <div v-on="{click:''}"></div>
    <script>
      export default {
        methods: {},
      };
    </script>
    ```

19. `$nextTick` 的使用

20. vue 组件中 data 为什么必须是一个函数

    形成作用域，组件多次复用时达到内部状态隔离的目的

21. vue 事件对象的使用

    $event 绑定事件时函数第一个参数就是 $event

22. 渐进式框架的理解

23. 单页面应用和多页面应用区别及优缺点

24. vue 中过滤器有什么作用及详解

25. v-if 和 v-for 的优先级

26. assets 和 static 的区别

    assets 目录中的文件会被 webpack loader 处理，static 不会，static 会被直接复制到打包目录

27. 列举常用的指令
28. vue 常用的修饰符
29. 数组更新检测

    重写数组方法

30. Vue.set 视图更新
31. 自定义指令详解

32. 引进组件的步骤
33. Vue-cli 打包命令是什么？打包后导致路径问题，应该在哪里修改

    是否二级目录，修改 publicPath 和 vue-router 的 base

34. 跨组件双向数据绑定

    .sync 的实现，还是自定义 v-model

35. delete 和 Vue.delete 删除数组的区别

36. SPA 首屏加载慢如何解决

    首屏主要是对入口文件进行瘦身，路由懒加载、组件按需加载。具体包括 gzip 压缩，剔除 log 日志，使用 svg 或者 雪碧图，第三方库、静态资源 cdn，利用 http 缓存，路由懒加载，splitChunks 提取公共代码。

    其中按需引入是在 babel 编译过程中，按需只引入相关代码。
    tree shaking 是在 webpack 打包阶段，移除 JavaScript 上下文中的未引用代码。

    全量引入 elementui，和按需引入 elemnet-ui

    splitChunks 配置，将多次用到的包抽离出来放到公共依赖文件，避免重复加载。

    webpack5 增量构建

37. vue-router 跳转和 location.href 有什么区别

    vue-router 跳转无状态刷新更改
    location.href 修改页面会进行刷新

    vue-router 跳转是内部 match 后渲染对应组件
    location.href 是刷新页面后重新执行了 vue-router 的逻辑渲染匹配出来的页面

38. vue slot
39. 你们 vue 项目是打包了一个 js 文件，一个 css 文件，还是有多个文件？

    多个，打包到一个文件会导致体积过大，网站体验不好

40. Vue 里面 router-link 在 pc 上有用，在安卓上没反应怎么解决？

    vue-router 兼容性问题，使用 babel-polyfill 解决

41. vue2 中注册在 router-link 上事件无效解决方法

    使⽤@click.native。原因：router-link 会阻⽌ click 事件，.native 指直接监听⼀ 个原⽣事件。

42. RouterLink 在 IE 和 Firefox 中不起作用（路由不跳转）的问题

    只⽤ a 标签，不使用 button 标签；
    使⽤ button 标签和 Router.navigate ⽅法

43. axios 的特点有哪些

    支持 promise 方式发送请求，请求拦截器

44. 请说下封装 vue 组件的过程？
45. vue 各种组件通信方法（父子 子父 兄弟 爷孙 毫无关系的组件）

46. vue mock 数据

    通过 dev-server 的 before 钩子和 mockjs 生成的数据来进行数据 mock

47. vue 封装通用组件
48. vue 初始化页面闪动问题

    使用 vue 开发时，在 vue 没有初始化之前，div 是不归 vue 管的，所以我们写的代码在没有解析完的情况下，会出现一个花屏闪烁的问题，这个时候就可以在 css 里写一个

    [v-cloak]{display:none}

    如果没有彻底解决，可以再根元素上加

49. vue 禁止弹窗后的屏幕滚动

    ```js
    methods : {
        //禁止滚动
      stop(){
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='hidden';
          document.addEventListener("touchmove",mo,false);//禁止页面滑动
        },
        /***取消滑动限制***/
        move(){
          var mo=function(e){e.preventDefault();};
          document.body.style.overflow='';//出现滚动条
          document.removeEventListener("touchmove",mo,false);
        }
    }
    ```

50. vue 更新数组时触发视图更新的方法

    通过 `$set` 或者将该变量重新赋值

51. vue 常用的 UI 组件库
52. vue 如何引进本地背景图片

    webpack alias 使用

53. vue 如何引进 sass

    搭建项目时使用，或者安装 dart-sass

54. vue 修改打包后静态资源路径的修改

    assetsDir 和 outputDir 还是 publicPath

55. 组件封装

    - props 验证、默认值
    - 插槽，react 的话就是 children 和 React.Children

56. vue 和 react 区别

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

57. vue props 会触发哪个生命周期函数

    如果 porps 或者 porps 关联的 computed 绑定到 dom 上，会触发 beforeUpdate 和 updated

58. vue3 为什么会使用 proxy 来代替 object.defineproperty

    2.0 的问题，给对象新增属性时，obj.a = 10 无法被拦截到
    给数组按照索引赋值，通过修改 length 的方式修改数组都无被拦截到，都需要用到`$set` 来手动解决

    但是使用 proxy 就可以完美解决上述问题

59. vue3 是如何通过 proxy 来代理数据的

60. 谈谈你对 keep-alive 的理解
61. vue-ssr 原理，不依赖框架如何实现
62. 在 vue 中 watch 和 created 哪个先执行？为什么？

    在 wacth 监控数据时，设置 immediate：true；会优先执行 watch,created 后执行;

## vuex 常见面试题

1. vuex 是什么？怎么使用？哪种功能场景使用它？
2. vuex 有哪几种属性
3. 不使用 vuex 会带来什么问题
4. vue.js 中 ajax 请求代码应该写在组件的 methods 中还是 vuex 的 actions 中？
5. vuex 一个例子方法
6. Vuex 中如何异步修改状态
7. Vuex 中 actions 和 mutations 的区别
8. 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

   纯函数，给定同样的输入返回同样的输出，可预测性。

9. vuex 的实现原理，vuex 中 state 如何促使视图更新
