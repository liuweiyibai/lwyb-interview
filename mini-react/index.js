/**
 * fiber 之前使用对象结构表示vdom树，当更新的时候找出需要更新的节点，然后更新他们，
 * 这个阶段称为协调阶段，所以这个阶段，会一直执行，如果更新数据很多，执行时间过长，导致浏览器卡死
 *
 *
 * fiber 执行单元，也是一个数据结构
 *
 * render 阶段会构建 fiber 树
 *
 * fiber 树遍历规则
 * 1. 从顶点遍历
 * 2. 深度优先
 */
const rootFiber = {};
let nextUnitOfWork = null; // 下一个执行单元
function workLoop() {
  while (nextUnitOfWork) {
    // 返回下一个执行单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

//
function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    return fiber.child;
  }
  // 当前 fiber 没有子节点
  while (fiber) {
    completeUnitWork(fiber);
    if (fiber.sibling) {
      // 如果有相邻节点，返回相邻节点
      return fiber.sibling;
    }
    // 向上查找
    fiber = fiber.return;
  }
}
function beginWork(fiber) {}
