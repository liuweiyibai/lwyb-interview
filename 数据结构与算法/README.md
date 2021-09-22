# 数据结构与算法用 JavaScript 描述

JavaScript 中，函数的参数传递方式都是按值传递，没有按引用传递的参数。但是 JavaScript
中有保存引用的对象，比如数组，如例 1-10 所示，它们是按引用传递的。

## 递归

```js
function factorial(number) {
  if (number == 1) {
    return number;
  } else {
    return number * factorial(number - 1);
  }
}
print(factorial(5));
```

## 数组

JavaScript 中的数组是一种特殊的对象，用来表示偏移量的索引是该对象的属性，索引可
能是整数。然而，这些数字索引在内部被转换为字符串类型，这是因为 JavaScript 对象中
的属性名必须是字符串。数组在 JavaScript 中只是一种特殊的对象，所以效率上不如其他
语言中的数组高。

对数组增删改查，指定位置删除插入元素。

使用迭代器遍历数组。

## 栈

只能从栈顶进行操作。特点是，后入先出

```js
// 使用 js 模拟栈数据结构实现
import './stack.js';
```

## 队列

## 阅读位置

[63 页](https://clearlywind.com/pdf/数据结构与算法JavaScript描述.pdf)
