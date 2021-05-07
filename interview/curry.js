function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

function curry2(fn, ...args) {
  return function curried(...args2) {
    var currentArgs = [...args, ...args2];
    if (currentArgs.length >= fn.length) {
      return fn.apply(this, currentArgs);
    } else {
      return function (...args3) {
        curry2.apply(this, [...currentArgs, ...args3]);
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

var add2 = curry(add);
// console.log(add2(1)(2)(1));

var add3 = curry2(add,1);
add3(1)(1);
console.log(add3(3)(1));
