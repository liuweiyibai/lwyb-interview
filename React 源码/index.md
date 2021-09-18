# React 源码

在源码的 scheduler 中使用了小顶堆 这种数据结构，调度的实现则使用了 messageChannel，在 render 阶段的 reconciler 中则使用了 fiber、update、链表 这些结构，diff 算法的过程则使用了 dfs，lane 模型使用了二进制掩码。学习本课程也顺便巩固了数据结构和算法、事件循环。

Scheduler 都调度那些任务？
Scheduler 内部做了些什么事？

Reconciler 如何 diff

Renderer 如何渲染

React 16 Fiber 解决的痛点
React 17 解决了哪些问题

## React diff

diff 算法分为单节点的 diff 和多节点的 diff（例如一个节点中包含多个子节点就属于多节点的 diff），单节点会根据节点的 key 和 type，props 等来判断节点是复用还是直接新创建节点，多节点 diff 会涉及节点的增删和节点位置的变化。

## Scheduler

采用 MessageChannel 来实现类似 requestIdleCallback 的类似效果

## 相关概念

dfs，深度优先搜索算法（英语：Depth-First-Search，DFS）是一种用于遍历或搜索树或图的算法

堆，堆是一种非线性结构，可以把堆看作一棵二叉树，也可以看作一个数组，即：堆就是利用完全二叉树的结构来维护的一维数组。

堆可以分为大顶堆和小顶堆。

大顶堆：每个结点的值都大于或等于其左右孩子结点的值。
小顶堆：每个结点的值都小于或等于其左右孩子结点的值。

Lane

React 双缓存，在经过 reconcile（diff）形成了新的 workInProgress Fiber 然后将 workInProgress Fiber 切换成 current Fiber 应用到真实 dom 中，存在双 Fiber 的好处是在内存中形成视图的描述，在最后应用到 dom 中，减少了对 dom 的操作
