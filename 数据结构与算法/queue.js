class Queue {
	constructor() {
		this.dataStore = []
	}

	// 入队
	enqueue(element) {
		this.dataStore.push(element)
	}

	// 出队
	dequeue() {
		return this.dataStore.shift()
	}

	// 读取队首元素
	front() {
		return this.dataStore[0]
	}

	// 读取队尾元素
	back() {
		return this.dataStore[this.dataStore.length - 1]
	}

	// 方法显示队列内的所有元素
	toString() {
		return this.dataStore.toString()
	}

	// 判断一个队列是否为空
	empty() {
		if (this.dataStore.length === 0) return true
		return false
	}

	count() {
		return this.dataStore.length
	}
}

const print = console.log

var q = new Queue()
q.enqueue('赵钱孙李')
q.enqueue('周吴郑王')
q.enqueue('冯陈褚卫')
print(q.toString())
q.dequeue()
print(q.toString())
print('队列第一个: ' + q.front())
print('队列最后一个: ' + q.back())

console.log(q.count())

// 基数排序
// 参数 digit 表示个位数或十位数上的值

var queues = []
for (var i = 0; i < 10; ++i) {
	queues[i] = new Queue()
}
var nums = []
for (var i = 0; i < 10; ++i) {
	nums[i] = Math.floor(Math.floor(Math.random() * 101))
}

function distribute(nums, queues, n, digit) {
	for (var i = 0; i < n; ++i) {
		if (digit === 1) {
      // [1-9]
      // 获取个位的那个数字
			queues[nums[i] % 10].enqueue(nums[i])
		} else {
      // 获取十位的那个数字
			queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
		}
	}
}

function collect(queues, nums) {
	var i = 0
	for (var digit = 0; digit < 10; ++digit) {
		while (!queues[digit].empty()) {
			nums[i++] = queues[digit].dequeue()
		}
	}
}

// function dispArray(arr) {
// 	for (var i = 0; i < arr.length; ++i) {
// 		putstr(arr[i] + ' ')
// 	}
// }
