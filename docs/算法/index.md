# 算法篇

## 8 中常见的数据结构

数组、栈、队列、链表、图、树、前缀树、哈希表

1. 数组

   数组是最常用的数据结构，比如**栈**和**队列**都是由数组衍生而来

2. 栈

   栈中的元素采用 LIFO (Last In First Out)，即后进先出。

3. 队列

   队列与栈类似，都是采用线性结构存储数据，它们区别在于，队列是先进先出

4. 链表

   链表(Linked List)也是线性结构，它与数组看起来非常像，但是它们的内存分配方式、内部结构和插入删除操作方式都不一样。

   链表是一系列节点组成的链，每一个节点保存了数据以及指向下一个节点的指针。链表头指针指向第一个节点，如果链表为空，则头指针为空或者为 null。

   链表可以用来实现文件系统、哈希表和邻接表。

5. 图

   图(graph)由多个节点(vertex)构成，节点之间阔以互相连接组成一个网络。(x, y)表示一条边(edge)，它表示节点 x 与 y 相连。边可能会有权值(weight/cost)。

6. 树

   树(Tree)是一个分层的数据结构，由节点和连接节点的边组成。树是一种特殊的图，它与图最大的区别是没有循环。

   树被广泛应用在人工智能和一些复杂算法中，用来提供高效的存储结构。

7. 前缀树

   前缀树(Prefix Trees 或者 Trie)与树类似，用于处理字符串相关的问题时非常高效。它可以实现快速检索，常用于字典中的单词查询，搜索引擎的自动补全甚至 IP 路由。

8. 哈希表

   哈希(Hash)将某个对象变换为唯一标识符，该标识符通常用一个短的随机字母和数字组成的字符串来代表。哈希可以用来实现各种数据结构，其中最常用的就是哈希表(hash table)。

   哈希表通常由数组实现。

   哈希表的性能取决于 3 个指标：

   哈希函数
   哈希表的大小
   哈希冲突处理方式

> 参考地址：[代码面试需要知道的 8 种数据结构(附面试题及答案链接)](https://blog.fundebug.com/2018/08/27/code-interview-data-structure/)

- 基础数据结构(抛开语言)

  1. 数组
     数据连续，支持随机访问（访问第 n 个数据），根数据在内存里的存储方式比较像
     新增数据的复杂度 o(n)
     查找数据 根据索引查 o(1)
     值查找，只能遍历查找 o(n)
  2. 链表
     链表就是非连续存储
     新增删除，o1 复杂度
     查找，On
     链表，react-fiber。vue-keep-alive 中使用的 lru 算法就是使用链表

     环形链表判断会否有环

  3. 对象（哈希表） 数组+链表

     增加、删除、查询复杂度都是 O(1)

  4. 树

     dom 节点就是一个树，链表分叉
     二叉树，二叉树的最大深度，树形结构使用地推

     ```js
     // 二叉树递归
     // 多叉树可以简化为二叉树
     var maxDepth = function (root) {
       if (root === null) {
         return 0;
       }
       return Math.max(root);
     };
     ```

     两棵树是否相同

- 什么是算法复杂度

  语言是数据结构实现的一种方式

- 生成指定长的的随机数数组

  ```ts
  const makeRandom = () => Math.floor(Math.random() * 10000);
  export const makeArray = (len: number) =>
    [...new Array(len)].map(() => makeRandom());
  ```

- 实现一个 LUR 缓存函数

  最近最常使用，每次存取都将 key 在插入到 keys 最后，超过 max 值后将第一个删除

  ```js
  class LRUCache {
    constructor(max) {
      this.max = max;
      this.keys = [];
      this.cache = {};
    }
    get = (k) => {
      // 如果缓存存在
      if (this.cache[k]) {
        // 先将 keys 移除
        this.remove(this.keys, k);
        // 然后再加到keys中
        this.keys.push(k);
        return this.cache[k];
      } else {
        return -1;
      }
    };
    put = (k, v) => {
      // 如果 key值存在
      if (this.cache[k]) return;

      // 将key提前
      this.keys.push(k);
      if (this.keys.length > this.max) {
        // 
        delete this.cache[this.keys[0]];
        this.keys.shift();
      }
      this.cache[k] = v;
    };
    remove = (arr, item) => {
      if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
          return arr.splice(index, 1);
        }
      }
    };
  }
  ```

  leecode 中 lru 缓存

  ```js
  var LinkNode = function (key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.pre = null;
  };
  var DoubleLinkedList = function () {
    this.size = 0;
    this.head = new LinkNode();
    this.tail = new LinkNode();
    this.head.next = this.tail;
    this.tail.pre = this.head;
  };

  DoubleLinkedList.prototype.addNode = function (node) {
    if (!(node instanceof LinkNode))
      throw new Error('param must be a LinkNode');
    // 插入节点时，使用尾插法。这里可以利用双向链表一直在尾结点前驱插入节点。
    const preNode = this.tail.pre;
    const nextNode = this.tail.pre.next;
    node.pre = preNode;
    node.next = nextNode;
    preNode.next = node;
    nextNode.pre = node;
    this.size++;
  };

  DoubleLinkedList.prototype.deleteNode = function (node) {
    if (!(node instanceof LinkNode))
      throw new Error('param must be a LinkNode');
    // 将刚刚访问过的节点插入到链表最后一位。
    const preNode = node.pre;
    const nextNode = node.next;
    preNode.next = nextNode;
    nextNode.pre = preNode;
    this.size--;
  };

  DoubleLinkedList.prototype.refreshList = function (node) {
    this.deleteNode(node);
    this.addNode(node);
  };

  /**
   * @param {number} capacity
   */
  var LRUCache = function (capacity) {
    this.maxSize = capacity;
    this.map = new Map();
    this.doubleLinkedList = new DoubleLinkedList();
  };

  /**
   * @param {number} key
   * @return {number}
   */
  LRUCache.prototype.get = function (key) {
    if (this.map.get(key) === undefined) return -1;
    const curNode = this.map.get(key);
    this.doubleLinkedList.refreshList(curNode);
    return curNode.value;
  };

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  LRUCache.prototype.put = function (key, value) {
    const newNode = new LinkNode(key, value);
    //  如果key已经存在，则变更其值
    if (this.map.get(key)) {
      this.doubleLinkedList.refreshList(this.map.get(key));
      return (this.map.get(key).value = value);
    }
    if (this.map.size < this.maxSize) {
      this.doubleLinkedList.addNode(newNode);
    } else {
      // 需要清理链表中的首元节点,并将新节点插入到尾部
      const firstNode = this.doubleLinkedList.head.next;
      this.doubleLinkedList.deleteNode(firstNode);
      this.doubleLinkedList.addNode(newNode);
      // 同时需要清理掉散列表中的key
      this.map.delete(firstNode.key);
    }
    this.map.set(key, newNode);
  };
  ```

- 回文子串
  给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

  示例 1：

  输入："abc"
  输出：3
  解释：三个回文子串: "a", "b", "c"
  示例 2：

  输入："aaa"
  输出：6
  解释：6 个回文子串: "a", "a", "a", "aa", "aa", "aaa"

  ```js
  // 动态规划算法
  ```

- [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
- 尾递归优化
- [猴子吃香蕉](https://leetcode-cn.com/problems/koko-eating-bananas/)
- [回文字符串个数](https://leetcode-cn.com/problems/palindromic-substrings/)
- 时针和分针的夹角？

- 输入一个字符串，实现字符串翻转输出

  ```js
  const reverseString = (s) => {
    const len = s.length;
    let left = 0,
      right = len - 1;
    while (left < right) {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
    return s;
  };
  // 内存占用小于上面的
  const reverseString = (s) => {
    let i = 0;
    l = s.length - 1;
    for (; i < l; i++, l--) {
      [s[i], s[l]] = [s[l], s[i]];
    }
    return s
  };
  ```

- 从数组中找出所有相同元素，并且做出分类。

- 希尔排序
