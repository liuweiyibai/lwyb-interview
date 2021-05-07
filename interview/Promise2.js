const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  value = null;
  reason = null;
  status = PENDING;

  onFulfilledCallback = null;
  onRejectedCallback = null;

  resolve = value => {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  };

  reject = err => {
    if (this.status === PENDING) {
      this.reason = err;
      this.status = REJECTED;
      this.onRejectedCallback && this.onRejectedCallback(err);
    }
  };

  then(onFulfilled, onRejected) {

    // 为了可以实现链式调用，这里创建一个实例，并且在后面 return 出去
    const innerPromise = new MyPromise((resolve,reject)=>{
      if(status === FULFILLED){

      }
    })


    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      // 异步任务的时候，将 then 的回调函数保存
      // 在 resolve 中进行调用
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected;
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

// promise.then(
//   value => {
//     console.log('resolve', value);
//   },
//   reason => {
//     console.log('reject', reason);
//   }
// );

console.log('ffffff\n')
const promise2 = new Promise((resolve, reject) => {
  resolve(1);
});
promise2.then(res => {
  console.log('aa')
  console.log(res);
});
promise2.then(res2 => {
  console.log('bb')
  console.log(res2);
});
promise2.then(res => {
  console.log('cc')
  console.log(res);
});
