function new2(ctor, ...args) {
  // ctor 比如是一个函数
  const obj = Object.create(ctor);
  new2.target = ctor; // new 调用的函数内部 new.target 就是当前构造函数
  let res = ctor.apply(obj, [...args]);
  // 判断res为非null对象、函数
  return isObj(res) || isFun(res) ? res : obj;
}
