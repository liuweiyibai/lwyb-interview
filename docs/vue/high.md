# vue 原理相关面试题

1. 说下双向绑定原理

   在初始化 vue 实例时，遍历 data 这个对象，给每一个键值对利用 Object.definedProperty 对 data 的键值对新增 get 和 set 方法，利用了事件监听 DOM 的机制，让视图去改变数据。通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化->视图更新。

2. 前端路由原理

   前端根据 url 变化显示不同视图

3. vue data 更新过程，是如何触发到 dom 的

   ffdsfds

4. vue 中 $set 和 $delete 实现原理

   $delete(target,value)
   $set(target,key,value)

   [参考链接](https://juejin.cn/post/6844903834003701768)

   基于源码理解，$delete 会判断对对象操作还是数组，如果是数组，则调用 splice 方法删除数组元素，splice 会触发响应式更新，完后 return 代码
   如果是对象，则判断属性是否存在对象上，对象是不是 vue 实例，如果都不满足，则使用 delete key.value 删除后调用 target 上的 observe 对象通知依赖进行更新

   $set，判断 target 是数组还是对象，当是数组时，key 就是索引，比较 key 和 target 的 length 的大小，将 target.length 设置为大值，完后通过 splice 在`target[key]` 位置替换或者插入元素。如果是对象，如果 target 是响应式的，并且 key 在 target 上，直接`target[key] = value` 进行赋值，如果不是响应式的，则通过 `defineReactive` 定义为响应式然后通知依赖更新

5. vue 实例挂载的过程

   1. new Vue 的时候调用会调用 `_init` 方法
   2. 定义 `$set`、`$get` 、`$delete`、`$watch` 等方法
   3. 定义 `$on`、`$off`、`$emit`、`$off` 等事件
   4. 定义 `_update`、`$forceUpdate`、`$destroy` 生命周期
   5. 调用 `$mount` 进行页面的挂载

   挂载的时候主要是通过 mountComponent 方法

   定义 updateComponent 更新函数

   执行 render 生成虚拟 DOM

   `_update` 将虚拟 DOM 生成真实 DOM 结构，并且渲染到页面中

6. vue 性能优化

   编码和工程化方向，vue 编码时需要注意,尽量减少 data 中的数据，data 中的数据不需要双向绑定的使用 object.freeze，减少深层级嵌套；v-if 和 v-for 不能连用；灵活使用 keep-alive 缓存组件和 component 动态组件，在更多的情况下，使用 v-if 替代 v-show，key 保证唯一，使用路由懒加载、异步组件。
   工程化基于 webpack，减少构建体积，资源 cdn、gzip、splitChunk 拆包、第三方库按需引入

7. vue2 中为什么要求组件模板只能有一个根元素？

8. 在 vue 中 watch 和 created 哪个先执行？为什么？

   在 wacth 监控数据时，设置 immediate：true；会优先执行 watch,created 后执行;

9. vue 中 mixins 和 extends 有什么区别？
   extend 用于创建 vue 实例
   mixins 可以混入多个 mixin，
   extends 只能继承一个,mixins 类似于面向切面的编程（AOP），extends 类似于面向对象的编程,
   优先级 Vue.extend>extends>mixins

10. vue mixins 使用场景
    当多个组件使用到公共逻辑，包括共用的 method、data、生命周期等

11. 在 vue 中 created 与 activated 有什么区别？

    created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

    activated()：是在路由设置`<keep-alive></keep-alive>`时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用。

12. 为什么在 v-for 中的 key 不推荐使用随机数或者 index 呢？那要怎么使用才比较好呢？

    因为在插入数据或者删除数据的时候，会导致后面的数据的 key 绑定的 index 变化，进而导致从新渲染，效率会降低

13. 如何批量引入组件？

    webpack 中 require.context 批量导入某个目录下下的所有文件

14. 跟 keep-alive 有关的生命周期是哪些？描述下这些生命周期

    activated 和 deactivated，keep-alive 的生命周期
    1.activated： 页面第一次进入的时候，钩子触发的顺序是 created->mounted->activated
    2.deactivated: 页面退出的时候会触发 deactivated，当再次前进或者后退的时候只触发 activated

15. vue 中怎么重置 data？

    ```js
    Object.assign(); // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象, 此方法是浅拷贝
    this.$data; // 获取当前状态下的data
    this.$options.data(); // 获取该组件初始状态下的 data。
    Object.assign(this.$data, this.$options.data());
    ```

16. Vue.observable 你有了解过吗？

    类轻量级 vuex，可以用作状态管理。可以让一个对象实现响应式，实现依赖收集更新到视图层

17. vue 如果想扩展某个现有的组件时，怎么做呢？

    使用 Vue.extend 直接扩展
    使用 Vue.mixin 全局混入
    HOC 封装

18. 你了解 vue 的 diff 算法吗
19. vue diff 和 react diff 的区别

20. vue 如何优化首页的加载速度？

    服务端渲染或者减少入口文件引入大小，包括异步引入组件，cdn 加载，图片懒加载，域名拆分

21. 你知道 nextTick 的原理吗？

    提到 DOM 的更新是异步执行的，只要数据发生变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。简单来说，就是当数据发生变化时，视图不会立即更新，而是等到同一事件循环中所有数据变化完成之后，再统一更新视图。

    微任务向宏任务的降级处理。

22. 说说你对 proxy 的理解

    vue 的数据劫持有两个缺点:
    1、无法监听通过索引修改数组的值的变化
    2、无法监听 object 也就是对象的值的变化
    所以 vue2.x 中才会有 `$set` 属性的存在

    proxy 是 es6 中推出的新 api，可以弥补以上两个缺点，所以 vue3.x 版本用 proxy 替换 object.defineproperty

23. 说说你觉得认为的 vue 开发规范有哪些？

    看一下 vue 风格指南

24. vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢?

    主要区别看请求中是否涉及到 dom 操作，比如图表渲染

25. 说说你对 extend 的理解

    extend：创建、复用组件，使用 extend 时，data 选项必须是函数

26. 说说你对 keep-alive 的理解是什么？

    保留内部组件状态，避免第二次加载时重复渲染，内置 actived,beforeActived 钩子，使用 lru 算法缓存组件 options

27. vue scoped 属性作用？实现原理？

    达到 css 样式不互相污染的作用，原理是依赖 postcss 给每一个 dom 元素增加独一无二的属性

    [参考链接](https://blog.csdn.net/fujiaran/article/details/108760419)

28. 怎么看待 virtual dom？

    通过虚拟 dom 对比真实 dom ，来进行真实 dom 的最小更新，主要是为了跨平台方便

29. ast 语法树了解吗？
30. vue-loader 做了哪些事情？
31. vue diff？
32. vue computed 和 watch 区别？

    都可以监听 data 或者 props 并且执行对应逻辑，watch 适合监听数据后执行某些逻辑，computed 适合简化 data 和 props 的计算，因为其有缓存结果的特性，当依赖不发生变化时，结果不会重新计算

33. computed 怎么实现的缓存（dirty）？
34. vue3 双向数据绑定实现？
35. createRender？和 vue2 有哪些不同，提到了函数式编程
36. 说下对函数式编程对的理解。
37. 对 MVC （react） MVVM（vue）的了解?
38. vue 静态标记了解过吗？

    vue 静态标记会在解析 template 时标记静态节点、比如没有指令的 html 标签、文本节点等，好在更新时跳过这些节点
