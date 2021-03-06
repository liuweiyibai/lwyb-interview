# 常见基础排序算法

## 排序

将一个数组排好顺序

1. 冒泡 O(n²)
2. 快排 On()

   ```js
   // 最普通的快排比sort快30%，我之前自己在 chrome 上跑的(随机的数值)
   function quickSort(arr) {
    if (arr.length === 0) {
     return []
    }
    var flag = arr[0]
    var left = []
    var right = []
    for (var i = 1; i < arr.length; i++) {
     var item = arr[i]
     if (item > flag) {
      right.push(item)
     } else {
      left.push(item)
     }
    }

    return quickSort(left).concat(flag, quickSort(right))
   }
   var arr = [95, 43, 43, 56, 55, 4, 2, 4, 424, 435, 90]
   console.log(quickSort(arr)) // [2, 4, 4, 43, 43, 55, 56, 90, 95, 424, 435]
   ```

## 递归

## 回溯

1. 全排列

## 贪心

## 动态规划

## 查找数组最大值

1. Math.max

   ```js
   var arr = [1, 5, 3]
   Math.max.apply(null, arr)
   Math.max(...arr)
   ```

## 洗牌

```js
const shuffle = arr => {
 var result = [],
  random
 while (arr.length > 0) {
  random = Math.floor(Math.random() * arr.length)
  result.push(arr[random])
  arr.splice(random, 1)
 }
 return result
}

let arr: number[] = [...new Array(100)].map((_, i) => i)

/**
 * 洗牌函数，对正序数组进行重排
 */
// arr = shuffle1<number>(arr);
function shuffle1<T>(arr: T[]): T[] {
 let length = arr.length,
  element: T,
  random: number
 while (length) {
  random = Math.floor(Math.random() * length--)
  element = arr[length]
  ;[arr[length], arr[random]] = [arr[random], element]
 }
 return arr
}

const shuffle2 = (arr = []) => arr.sort((a, b) => Math.random() - 0.5)

shuffle(arr)
```

字典树

1. 快速排序

2. 二分查找法，返回数组中某元素的位置

   重点是返回的数组必须是有序的
   比如在数组 [1,2,3,4,5,6] 中查找 2 的位置

   ```js
   var arr = [...new Array(128)].map((t,i)=>i)
   function binSearch(arr, data) {
    // 开始的位置
    let start = 0
    let end = arr.length - 1
    while (start <= end) {
     // 取中间值
     var mid = Math.floor((end + start) / 2)
     // 当 [中间值] 小于 [查找值] 我们就要从
     // [中间值] 到 [数组最后一个值] 重新查找
     if (arr[mid] < data) {
      start = mid + 1
     } else if (arr[mid] > data) {
      //
      end = mid - 1
     } else {
      return mid
     }
    }
    return -1
   }
   var test = [1, 2, 3, 4, 5, 6]

   console.log(binSearch(test, 6))
   ```

   ```js
   function binarySearch(target, arr, start, end) {
    if (start > end) {
     return -1
    }
    var start = start || 0
    var end = end || arr.length - 1
    var mid = parseInt(start + (end - start) / 2)
    if (target == arr[mid]) {
     return mid
    } else if (target > arr[mid]) {
     return binarySearch(target, arr, mid + 1, end)
    } else {
     return binarySearch(target, arr, start, mid - 1)
    }
    return -1
   }
   ```
