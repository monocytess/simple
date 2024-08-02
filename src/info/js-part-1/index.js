function Calculator() {
  this.read = function () {
    this.a = +prompt('input num a ?', 0)
    this.b = +prompt('input num b ?', 0)
    return this
  }
  this.sum = function () {
    return this.a + this.b
  }
  this.mul = function () {
    return this.a * this.b
  }
}

function Accumulator(value) {
  this.value = value

  this.read = function () {
    this.value += +prompt('input new value', 0)
  }
}

function getMaxSubSum(arr) {
  const filter = arr.filter(item => item > 0)
  if (filter.length === 0) return 0

  let max = 0
  let partialSum = 0

  for (let item of arr) {
    partialSum += item
    max = Math.max(max, partialSum)
    if (partialSum < 0) partialSum = 0
  }

  return max
}

function Calculator_(str) {
  this.methods = {
    '-': (a, b) => a - b,
    '+': (a, b) => a + b
  }

  this.calculate = function (str) {
    let [a, op, b] = str.split(' ')
    a = +a
    b = +b

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN
    }

    return this.methods[op](a, b)
  }

  this.addMethod = function (name, func) {
    this.methods[name] = func
  }
}

function aClean(arr) {
  let obj = {}

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split('').sort().join('')
    obj[sorted] = arr[i]
  }

  return Object.values(obj)
}

function getDateAgo(date, days) {
  let copyDate = new Date(date)
  copyDate.setDate(date.getDate() - days)
  return copyDate.getDate()
}

function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0)
  return date.getDate()
}

function getSecondsToday() {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth()
  let day = today.getDay()

  let start = new Date(`${year}-${month}-${day}`).getTime()

  return Math.round((new Date().getTime() - start) / 1000)
}

function getSecondsToTomorrow() {
  let now = new Date()
  let tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)

  const [_year, _month, _day] = [tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate()]
  let target = new Date(`${_year}-${_month}-${_day}`).getTime()

  return Math.round((target - now.getTime()) / 1000)
}

function formatDate(date) {
  let diff = new Date() - date

  if (diff < 1000) return 'right now'

  let sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec} sec ago`

  let min = Math.floor(diff / 60000)
  if (min < 60) return `${min} min ago`

  let d = date
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2))

  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':')
}

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0)
  } else {
    let sum = 0
    for (let subDep of Object.values(department)) {
      sum += sumSalaries(subDep)
    }

    return sum
  }
}

function fib(n) {
  let a = 1
  let b = 1
  for (let i = 3; i <= n; i++) {
    let c = a + b
    a = b
    b = c
  }
  return b
}

function sum(a) {
  const innerSum = b => {
    return sum(a + b)
  }

  innerSum.valueOf = () => a

  return innerSum
}

function printNumber(from, to) {
  // let timer = setTimeout(function run() {
  //   console.log(from++)
  //   timer = setTimeout(run, 1000)
  //   if (from >= to) {
  //     clearTimeout(timer)
  //     timer = null
  //   }
  // }, 1000)

  // let timer = setInterval(() => {
  //   console.log(from++)
  //   if (from >= to) {
  //     clearInterval(timer)
  //     timer = null
  //   }
  // }, 1000)

  function go() {
    console.log(from)
    if (from === to) {
      clearInterval(timer)
    }
    from++
  }

  go()
  let timer = setInterval(go, 1000)
}

function cacheDecorator(func) {
  let cache = new Map()

  return function (...args) {
    let key = args.join(',')

    if (cache.has(key)) {
      return cache.get(key)
    }

    let result = func.apply(this, args)
    cache.set(key, result)
    return result
  }
}

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args)
    return func.apply(this, args)
  }

  wrapper.calls = []
  return wrapper
}

function delay(func, ms) {
  function fn(...args) {
    return setTimeout(() => func.apply(this, args), ms)
  }

  return fn
}

function debounce(func, ms) {
  let timer = null

  function wrapper(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }

  return wrapper
}

function throttle(func, ms) {
  let timer = null
  let lastContext = null
  let lastArgs = null

  function wrapper(...args) {
    if (!timer) {
      func.apply(this, args)
      timer = setTimeout(() => {
        timer = null
        if (lastArgs) {
          wrapper.apply(lastContext, lastArgs)
          lastArgs = null
          lastContext = null
        }
      }, ms)
    } else {
      lastContext = this
      lastArgs = args
    }
  }

  return wrapper
}

