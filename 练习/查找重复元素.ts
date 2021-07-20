var arr = [2, 3, 1, 0, 2, 5, 3];

// 查找数组重复元素
function duplicates(arr: number[]) {
  var result = [];
  arr.forEach(function (elem) {
    if (
      // lastIndexOf 从左到右查找，元素最后一次出现的地方
      // indexOf 从左到右，元素第一次出现的地方
      arr.indexOf(elem) !== arr.lastIndexOf(elem) &&

      // 不是已经找到的重复元素
      result.indexOf(elem) === -1
    ) {
      result.push(elem);
    }
  });
  return result;
}

console.log(duplicates(arr));
