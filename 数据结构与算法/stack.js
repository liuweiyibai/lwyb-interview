class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }

  push(element) {
    // 这里要特别注意++操作符的位置， 它放在this.top的后面，这样新入栈的元素就被放在top的当前值对应的位置，然后再将变量top的值加1，指向下一个位置
    // 先运算后 ++
    this.dataStore[this.top++] = element;
  }

  pop() {
    // 先--，再运算
    return this.dataStore[--this.top];
  }

  peek() {
    // 永远返回其第一个元素，也就是栈顶元素
    return this.dataStore[this.top - 1];
  }

  length() {
    // length 是从1开始计算的
    return this.top;
  }

  clear() {
    this.top = 0;
  }
}

const print = console.log;

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

// ?栈的应用
// !判断一个单词是否是回文
function isPalindrome(word = '') {
  const s = new Stack();
  for (let i = 0; i < word.length; i++) {
    s.push(word[i]);
  }
  var rword = '';
  while (s.length() > 0) {
    rword += s.pop();
  }
  if (rword === word) return true;
  return false;
}

print(isPalindrome('racecar')); // true

// 数制间的相互转换，可以利用栈将一个数字从一种数制转换成另一种数制。

// 进制转换，将数字转换为二进制和八进制

function mulBase(num, base) {
  var s = new Stack();
  do {
    s.push(num % base);
    num = Math.floor((num /= base));
  } while (num > 0);
  var converted = '';
  while (s.length() > 0) {
    converted += s.pop();
  }
  return converted;
}

// 栈递归，使用栈来模拟递归过程

function fact(n) {
  var s = new Stack();
  while (n > 0) {
    s.push(n--);
  }
  var product = 0;
  while (s.length() > 0) {
    product *= s.pop();
  }
  return product;
}

/**
 * 判断括号是否完全匹配
 */
var str = '2.3 + 23 / 12 + (3.14159×0.24';

function matchBracket(exp) {
  var s = new Stack();
  var len = exp.length;
  for (let i = 0; i < len; i++) {
    let ele = exp[i];
    // 如果有左括号，增加一个左括号
    if (ele === '(') {
      s.push('(');
    } else if (ele === ')') {
      // 如果有右括号，则移除一个
      if (s.length() > 0) {
        s.pop();
      } else {
        // 如果栈长度为零
        break;
      }
    }
  }
  return s.length() <= 0 ? true : false;
}

console.log(matchBracket(str));
