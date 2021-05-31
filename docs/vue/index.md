# vue 常见面试题

## 基础面试题

## 进阶面试题

1. vue2 中为什么要求组件模板只能有一个根元素？

2. 在 vue 中 watch 和 created 哪个先执行？为什么？

   在 wacth 监控数据时，设置 immediate：true；会优先执行 watch,created 后执行;

3. vue 中 mixins 和 extends 有什么区别？
   extend 用于创建 vue 实例
   mixins 可以混入多个 mixin，
   extends 只能继承一个,mixins 类似于面向切面的编程（AOP），extends 类似于面向对象的编程,
   优先级 Vue.extend>extends>mixins

4. vue mixins 使用场景
   当多个组件使用到公共逻辑，包括共用的 method、data、生命周期等

5. 在 vue 中 created 与 activated 有什么区别？

   created():在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。

   activated()：是在路由设置`<keep-alive></keep-alive>`时，才会有这个生命周期。在被 keep-alive 缓存的组件激活时调用。

6. 为什么在 v-for 中的 key 不推荐使用随机数或者 index 呢？那要怎么使用才比较好呢？

   因为在插入数据或者删除数据的时候，会导致后面的数据的 key 绑定的 index 变化，进而导致从新渲染，效率会降低

7. 如何批量引入组件？

   webpack 中 require.context 批量导入某个目录下下的所有文件

8. 跟 keep-alive 有关的生命周期是哪些？描述下这些生命周期

   activated 和 deactivated，keep-alive 的生命周期
   1.activated： 页面第一次进入的时候，钩子触发的顺序是 created->mounted->activated
   2.deactivated: 页面退出的时候会触发 deactivated，当再次前进或者后退的时候只触发 activated

9. vue 中怎么重置 data？

   ```js
   Object.assign(); // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象, 此方法是浅拷贝
   this.$data; // 获取当前状态下的data
   this.$options.data(); // 获取该组件初始状态下的 data。
   Object.assign(this.$data, this.$options.data());
   ```

10. Vue.observable 你有了解过吗？

    类轻量级 vuex，可以用作状态管理。可以让一个对象实现响应式，实现依赖收集更新到视图层

11. vue 如果想扩展某个现有的组件时，怎么做呢？

    使用 Vue.extend 直接扩展
    使用 Vue.mixin 全局混入
    HOC 封装

12. 你了解 vue 的 diff 算法吗

13. vue 如何优化首页的加载速度？

    服务端渲染或者减少入口文件引入大小，包括异步引入组件，cdn 加载，图片懒加载，域名拆分

14. 你知道 nextTick 的原理吗？

    提到 DOM 的更新是异步执行的，只要数据发生变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。简单来说，就是当数据发生变化时，视图不会立即更新，而是等到同一事件循环中所有数据变化完成之后，再统一更新视图。

15. 说说你对 proxy 的理解

    vue 的数据劫持有两个缺点:
    1、无法监听通过索引修改数组的值的变化
    2、无法监听 object 也就是对象的值的变化
    所以 vue2.x 中才会有 `$set` 属性的存在

    proxy 是 es6 中推出的新 api，可以弥补以上两个缺点，所以 vue3.x 版本用 proxy 替换 object.defineproperty

16. vue 性能优化

17. 说说你觉得认为的 vue 开发规范有哪些？

    看一下 vue 风格指南

18. vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢?

    主要区别看请求中是否涉及到 dom 操作，比如图表渲染

19. 说说你对 extend 的理解

    extend：创建、复用组件，使用 extend 时，data 选项必须是函数

20. 说说你对 keep-alive 的理解是什么？

    保留内部组件状态，避免第二次加载时重复渲染，内置 actived,beforeActived 钩子，使用 lru 算法缓存组件 options
