/**
 * 分析 promise 的构造函数应该具有哪些功能
 * 1. 实例化一个 Promise 的函数需要接收一个回调函数作为参数，回调函数需要传入两个参数，resolve 和 reject
 * @param {*} executor
 */

function _Promise(executor) {
  let _this = this;

  // 绑定 resolve 和 reject 上下文的 this 为此时 Promise 的 this
  executor(resolve.bind(this), reject.bind(this));

  /**
   * 2. Promise的三种状态: pending-等待, resolve-成功, reject-失败, 其中最开始为 pending 状态，
   * 并且一旦失败或者成功，Promise的状态就不会再改变，
   * 使用 $$status 来记录 Promise 的状态，并且根据 resolve 和 reject 的调用来修改状态
   */
  _this.$$status = 'pending';

  /**
   * 定义 resolve
   */
  _this.failCallback = undefined;
  _this.successCallback = undefined;
  _this.error = undefined;

  function resolve(params) {
    if (_this.$$status === 'pending') {
      _this.$$status = 'full';
      _this.successCallback(params);
    }
  }
  function reject(params) {
    if (_this.$$status === 'pending') {
      _this.$$status = 'fail';
      _this.failCallback(params);
    }
  }
}

_Promise.prototype.then = function (full) {
  this.failCallback = full;
};

var p = new _Promise((resolve, reject) => {
  // 做一些异步的事情

  resolve(1);
});
// p.then((a,b)=>{

// }).catch()

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallback = null;
  onRejectedCallback = null;

  resolve = value => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  };

  reject = err => {
    if (this.status === PENDING) {
      this.status === REJECTED;
      this.reason = err;
    }
  };

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  resolve('success');
  reject('err');
});

promise.then(
  value => {
    console.log('resolve', value);
  },
  reason => {
    console.log('reject', reason);
  }
);

// 执行结果：resolve success


// https://zhuanlan.zhihu.com/p/58428287

// https://es6.ruanyifeng.com/#docs/promise

// https://juejin.cn/post/6883121706123132936#heading-3