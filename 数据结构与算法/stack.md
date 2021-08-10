# 栈

栈内的元素只能通过列表的一端访问，这一端被称为栈顶，只能从最上面拿取或者插入，后入先出的一种数据结构。

对栈的操作一般是将数据压入栈中，和弹出栈，或者预览栈顶元素。

入栈使用 push()方法
出栈使用 pop()方法虽然可以访问栈顶的元素，但是调用该方法后，栈顶元素也从栈中被永久性地删除了。
peek()方法则只返回栈顶元素，而不删除它。

push()、pop()和 peek()是栈的 3 个主要方法， 但是栈还有其他方法和属性。clear()方法清除栈内所有元素，length 属性记录栈内元素的个数。 我们还定义了一个 empty 属性， 用以表示栈内是否含有元素，不过使用 length 属性也可以达到同样的目的。

我们使用 JavaScript 来模拟一个栈的实现，定义在 `./stack.js` 中。

## 回文

回文是指这样一种现象： 一个单词、 短语或数字， 从前往后写和从后往前写都是一样的。比如， 单词“dad”、“racecar”就是回文； 如果忽略空格和标点符号， 下面这个句子也是回文， “A man, a plan, a canal: Panama”；数字 1001 也是回文。

使用栈判断一个单词是否是回文。详见 `./stack.js`

## 递归

使用栈模拟递归过程。

比如求 x 的阶乘:

```js
function factorial(n) {
	// 递归需要终止条件
	if (n === 0) {
		return 1
	}
	return n * factorial(n - 1)
}

// 使用栈来实现阶乘
function fact(n) {
	var s = new Stack()
	while (n > 1) {
		s.push(n--)
	}

	var product = 1
	while (s.length() > 0) {
		product *= s.pop
	}
	return product
}
```

## 练习
