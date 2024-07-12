const curry = function (fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  }
};

// const fn = function sum(a, b, c) {
//   return a + b + c
// }
//
// const curriedFn = curry(fn);
// const result = curriedFn(1)(2)(3);
// console.log(result); // 6

function listBeautify(data) {
  if (data.length === 0) return `[[]]`
  if (data.length === 1) return `[[` + data[0].map(String).join(', ') + `]]`

  for (let i = 0; i < data.length; i++) {

  }


}