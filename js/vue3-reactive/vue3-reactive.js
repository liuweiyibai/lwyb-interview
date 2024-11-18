/**
 * 实现 vue3 的 reactive api
 * @param {*} target
 * @returns
 * @summary
 */

// 使用 weakMap 存储被代理的响应式对象
const reactiveMap = new WeakMap();

function reactive(target) {
  // 类型判断，只对引用数据类型生效
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 判断是否被重复代理
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target);
  }

  // 响应式处理
  return createReactiveObject(target, reactiveMap, mutableHandlers);
}

// 首先对象里面查找键值对是一种非常消耗性能的行为;
const mutableHandlers = {
  get: createrGetter(),
  set: createrSetter(),
};

function createrGetter() {
  return function get(target, key, receiver) {
    console.log(target, key, receiver);
    track(target, key);
    return target[key];
  };
}

function createrSetter() {
  return function set(target, key, value, receiver) {
    target[key] = value;
    return Reflect.set(target, key, value, receiver);
  };
}

// targetMap用于存储每个变量以及所拥有的副作用函数
const targetMap = new WeakMap();
// activeEffect则是具体的副作用函数，初始值为null
let activeEffect = null; // 存储一个副作用函数

/**
 * get 的时候触发，根据哪个对象的哪个键被读取，准确的做依赖收集
 * @param {*} target
 * @param {*} key
 */
function track(target, key) {
  let depsMap = targetMap.get(target); // 判断是否收集过该属性
  if (!depsMap) {
    depsMap = new Map(); // 初始化，依赖使用 Map 存储
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key); // 对属性的依赖做收集
  if (!deps) {
    deps = new Set(); // 如果该属性没有做过依赖收集，则初始化一下
  }

  // 如果有具体副作用函数，并且没被收集过，则收集
  if (!deps.has(activeEffect) && activeEffect) {
    deps.add(activeEffect);
  }
  depsMap.set(key, deps);
}

/**
 * set 的时候触发，根据哪个对象被设置，执行依赖
 * @param {*} target
 * @param {*} key
 * @returns
 */
function trigger(target, key) {
  const depMaps = targetMap.get(target);
  if (!depMaps) return;

  const deps = depMaps.get(key);
  if (!deps) return;

  deps.forEach((effect) => {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect();
    }
  });
}

/**
 * 创建响应式对象
 * @param {*} target
 * @param {*} _reactiveMap
 * @param {*} _mutableHandlers
 * @returns
 */
function createReactiveObject(target, _reactiveMap, _mutableHandlers) {
  // Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
  const proxy = new Proxy(target, _mutableHandlers);
  _reactiveMap.set(target, proxy);
  return proxy;
}

(() => {
  const obj = reactive({ a: 1 });
  const btn = document.querySelector("#btn");
  btn.addEventListener("click", () => {
    obj.a = obj.a + 1;
    console.log(obj.a);
  });
})();

/**
 * 触发被修改属性的每一个副作用函数，这就叫依赖触发，而在这之前，当然得记录下来我们修改的值还在哪些地方被用到了，这一过程就是依赖收集。
 */

function effect(fn, options = {}) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  if (!options.lazy) {
    effectFn();
  }

  effectFn.scheduler = options.scheduler;

  return effectFn;
}
