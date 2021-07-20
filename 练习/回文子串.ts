// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
// “回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串

var str = 'abc';
var str2 = 'aaa';

function countSubstrings(str: string) {
  let len = str.length;
  let count = 0;
  const dp = new Array(len);
  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (str[i] === str[j] && (j - i <= 1 || dp[i + 1])) {
        dp[i] = true;
        count++;
      } else {
        dp[i] = false;
      }
    }
  }
  console.log(dp);
  console.log(count);
  return count
}
countSubstrings(str2)
