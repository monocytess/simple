/**
 * desc: arrayDiff
 **/

console.log(`%c ${'hello challenges js'}`, 'color: #363636; font-size: 11px')

function arrayDiff(a, b) {
  return a.filter(e => !b.includes(e));
}

function countBits(n) {
  return n.toString(2).split('').filter(e => e === '1').length;
}

const funcs = [x => x + 1, x => x * x, x => 2 * x]

function compose(functions = []) {
  return function (x) {
    return functions.reduce((acc, func) => func(acc), x)
  }
}

function filter(arr, fn) {
  let filterArr = []
  arr.forEach((i, index) => {
    if (Boolean(fn(i, index))) {
      filterArr.push(i)
    }
  })

  return filterArr
}

function map(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = fn(arr[i], i, arr)
  }
  return arr
}

function reducer(nums, fn, init) {
  let res = init

  for (let i = 0; i < nums.length; i++) {
    (function (curr) {
      res = fn(res, curr)
    })(nums[i])
  }

  return res
}

Array.prototype.upperBound = function (target) {
  let length = this.length
  while (length) {
    if (target === this[length - 1]) {
      return --length
    }
    length--
  }
  return -1
}

Array.prototype.groupBy = function (fn) {
  const resObj = {}

  for (const item of this) {
    const key = fn(item)
    if (key in resObj) {
      resObj[key].push(item)
    } else {
      resObj[key] = [item]
    }
  }
  return resObj
};

function undefinedToNull(obj) {
  let covertObj = new obj.constructor()

  Object.entries(obj).forEach(([key, value]) => {
    covertObj[key] = (typeof value === 'object' && value !== null)
      ? undefinedToNull(value)
      : typeof value === 'undefined'
        ? null
        : value
  })

  return covertObj
}

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn((data, err) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      }, ...args)
    })
  }
}

function* dateRangeGenerator(start, end, step) {
  let [timeStart, timeEnd] = [Date.parse(start), Date.parse(end)]
  const baseDay = 86400000 // 24小时

  while (timeStart <= timeEnd) {
    let sYear = new Date(timeStart).getFullYear()
    let sMonth = Number(new Date(timeStart).getMonth() + 1) >= 10
      ? Number(new Date(timeStart).getMonth() + 1)
      : '0' + Number(new Date(timeStart).getMonth() + 1)
    let sDay = Number(new Date(timeStart).getDate()) >= 10
      ? Number(new Date(timeStart).getDate())
      : '0' + Number(new Date(timeStart).getDate())
    timeStart += baseDay * step
    yield `${sYear}-${sMonth}-${sDay}`
  }

  return timeEnd
}

function areDeeplyEqual(o1, o2) {
  if (o1 === o2) return true

  if (o1 === null || o2 === null) return false
  if (String(o1) !== String(o2)) return false

  if (typeof o1 !== 'object') {
    return o1 === o2
  }

  if (Array.isArray(o1)) {
    if (o1.length !== o2.length) return false

    for (let i = 0; i < o1.length; i++) {
      if (!areDeeplyEqual(o1[i], o2[i])) return false
    }
    return true
  }

  if (Object.keys(o1).length !== Object.keys(o2).length) return false

  for (const o1Key in o1) {
    if (!areDeeplyEqual(o1[o1Key], o2[o1Key])) return false
  }

  return true
}

function memoize(fn) {
  let cache = [new Map()]

  return function (...args) {
    let arr = cache
    for (let key of args) {
      let map = arr[0]
      if (!map.has(key)) {
        map.set(key, [new Map()])
      }
      arr = map.get(key)
    }
    if (arr.length !== 2) {
      arr.push(fn.apply(this, args))
    }
    return arr[1]
  }
}

function mostFrequent(data) {
  const count = {}

  data.forEach(item => {
    if (count.hasOwnProperty(item)) {
      count[item]++
    } else {
      count[item] = 0
    }
  })
  let maxValue = Math.max(...Object.values(count))
  for (let i = 0; i < Object.keys(count).length; i++) {
    if (count[Object.keys(count)[i]] === maxValue) {
      return Object.keys(count)[i]
    }
  }
}

function evenList(data) {
  if (data.length === 0) return 0

  let sum = data.reduce((previousValue, currentValue, currentIndex) => {
    if (currentIndex % 2 === 0) {
      previousValue += currentValue
    }
    return previousValue
  }, 0)

  return sum * data[data.length - 1]
}

function stockProfit(stock) {
  /*  let maxDiffValue = 0
    stock.reverse()
    for (let i = 0; i < stock.length; i++) {
      for (let j = i + 1; j < stock.length; j++) {
        maxDiffValue = Math.max(maxDiffValue, stock[i] - stock[j])
      }
    }

    return maxDiffValue*/

  if (stock.length === 0) return 0; // 处理空数组情况

  let profit = 0;
  let minimum = stock[0];

  for (let i = 1; i < stock.length; i++) {
    const price = stock[i];
    minimum = Math.min(minimum, price);
    profit = Math.max(profit, price - minimum);
  }

  return profit;
}


function threeWords(text) {
  let textArr = text.split(' ').map(item => {
    return (!isNaN(Number(item)) && typeof Number(item) === 'number')
      ? Number(item)
      : item
  })
  console.log('textArr >>>', textArr)
  let count = 0
  for (const t of textArr) {
    if (!isNaN(Number(t)) && typeof Number(t) === 'number') {
      count = 0
    }
    if (typeof t === 'string') {
      count++
    }
    if (count >= 3) {
      return true
    }
  }

  return false;
}

// function
// let list = [{}, [], 1, 2, 3, true, false, null, {}, "hi", 1, 2, 3]
// let list2 = [[1, 2, 3], [1, 3, 5], [1, 5, 9]]
// let fn = function (item) {
//   return typeof item;
// }
// let fn2 = function (list) {
//   return String(list[0]);
// }
//
//
// // console.log(list2.groupBy(fn2))
// console.log(list.groupBy(fn))