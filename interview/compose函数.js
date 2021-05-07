/**
 * 将多个相同参数的函数串联执行
 * redux 中增强 store
 */

function compose(...args) {
  if (args.length === 0) {
    return arg => arg;
  }

  if (args.length === 1) {
    return () => args[0]();
  }

  return args.reduce((a, b) => arg2 => a(b(arg2)));
}
