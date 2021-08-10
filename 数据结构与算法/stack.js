
class Stack {
	constructor() {
		this.dataStore = []
		this.top = 0
	}

	push(element) {
		// 这里要特别注意++操作符的位置， 它放在this.top的后面，这样新入栈的元素就被放在top的当前值对应的位置，然后再将变量top的值加1，指向下一个位置
		// 先运算后 ++
		this.dataStore[this.top++] = element
	}

	pop() {
		// 先--，再运算
		return this.dataStore[--this.top]
	}

	peek() {
		return this.dataStore[this.top - 1]
	}

	length() {
		// length 是从1开始计算的
		return this.top
	}

	clear() {
		this.top = 0
	}
}

const print = console.log

// var s = new Stack()
// s.push('David')
// s.push('Raymond')
// s.push('Bryan')
// print('length: ' + s.length())
// print(`目前第一个元素-${s.peek()}`)
// var popped = s.pop()
// print('删除的元素: ' + popped)
// print(s.peek())
// s.push('Cynthia')
// print(s.peek())
// s.clear()
// print('length: ' + s.length())
// print(s.peek())
// s.push('Clayton')
// print(s.peek())

// 判断一个单词是否是回文
function isPalindrome(word = '') {
	const s = new Stack()
	for (let i = 0; i < word.length; i++) {
		s.push(word[i])
	}
	var rword = ''
	while (s.length() > 0) {
		rword += s.pop()
	}
  if(rword === word) return true
  return false
}

print(isPalindrome('racecar')) // true