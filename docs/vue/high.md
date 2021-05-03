# 原理相关面试题

1. 说下双向绑定原理

   在初始化 vue 实例时，遍历 data 这个对象，给每一个键值对利用 Object.definedProperty 对 data 的键值对新增 get 和 set 方法，利用了事件监听 DOM 的机制，让视图去改变数据。通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化->视图更新。

2. history 原理

   根据路由匹配组件

3. vue data 更新过程，是如何触发到 dom 的

   ffdsfds

4. vue 中 $set 和 $delete 实现原理

   $delete(target,value)
   $set(target,key,value)

   [参考链接](https://juejin.cn/post/6844903834003701768)

   基于源码理解，$delete 会判断对对象操作还是数组，如果是数组，则调用 splice 方法删除数组元素，splice 会触发响应式更新，完后 return 代码
   如果是对象，则判断属性是否存在对象上，对象是不是 vue 实例，如果都不满足，则使用 delete key.value 删除后调用 target 上的 observe 对象通知依赖进行更新

   $set，判断 target 是数组还是对象，当是数组时，key 就是索引，比较 key 和 target 的 length 的大小，将 target.length 设置为大值，完后通过 splice 在`target[key]` 位置替换或者插入元素。如果是对象，如果 target 是响应式的，并且 key 在 target 上，直接`target[key] = value` 进行赋值，如果不是响应式的，则通过 `defineReactive` 定义为响应式然后通知依赖更新
