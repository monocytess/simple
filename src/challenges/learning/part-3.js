function convAggr(data) {
  const res = {}
  data.forEach(([key, value]) => !res.hasOwnProperty(key) ? res[key] = value : res[key] = res[key] + value)
  const temp = {}
  Object.entries(res).forEach(([key, value]) => (key !== '' && value !== 0) ? temp[key] = value : {})
  return temp
}

function fizzBuzz(a) {
  if (a % 3 === 0 && a % 5 === 0) return 'Fizz Buzz'
  if (a % 3 === 0 && a % 5 !== 0) return 'Fizz'
  if (a % 3 !== 0 && a % 5 === 0) return 'Buzz'
  return `${a}`
}

function sumLight(els = []) {
  let sum = els[els.length - 1].getTime()
  for (let i = els.length - 2; i >= 0; i--) {
    if (i % 2 === 0) {
      sum -= els[i].getTime()
    } else {
      sum += els[i].getTime()
    }
  }

  return (sum / 1000)
}

function bestStock(data) {
  let max = 0
  const map = new Map()
  Object.entries(data).forEach(([key, value]) => {
    map.set(value, key)
    max = Math.max(max, Number(value))
  })
  return map.get(max)
}

function squaresIntersect(s1, s2) {
  const [c1, c2, l] = s1
  const [_c1, _c2, _l] = s2

  const tr1 = [c1 + l, c2 + l]
  const tr2 = [_c1 + _l, _c2 + _l]
  if (tr1[0] - _c1 >= 0 && tr1[1] - _c2 >= 0) {
    if (tr2[0] - c1 >= 0 && tr2[1] - c2 >= 0) {
      return true
    }
  }

  return false
}

function commonTail(a, b) {
  if (!a || !a.length || !b || !b.length) return null

  for (let i = 0; i < a.length; i++) {
    let index = b.indexOf(a[i])
    if (index !== -1) {
      return b[index]
    }
  }
  return null
}

function removeAllAfter(items, border) {
  const index = items.indexOf(border) === -1 ? items.length - 1 : items.indexOf(border)
  return items.splice(0, index + 1)
}

function beatPrevious(digits) {
  if (digits.length <= 1) return [digits]
  let res = []

  let currentIndex = 0
  let prevNum = parseInt(digits[currentIndex])
  res.push(prevNum)
  currentIndex++

  while (currentIndex < digits.length) {
    let currentNum = 0
    let found = false

    for (let length = 1; length + currentIndex <= digits.length; length++) {
      currentNum = parseInt(digits.substring(currentIndex, length + currentIndex))
      if (currentNum > prevNum) {
        res.push(currentNum)
        prevNum = currentNum
        currentIndex += length
        found = true
        break
      }
    }

    if (!found) {
      break
    }
  }

  return res
}

// console.log(beatPrevious("600005"))
// console.log(beatPrevious("6000050"))
// console.log(beatPrevious("045349"))
// console.log(beatPrevious("6000050"))
// let numTest = beatPrevious("1234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234123412341234")
// let numMy = [1, 2, 3, 4, 12, 34, 123, 412, 3412, 34123, 41234, 123412, 341234, 1234123, 4123412, 34123412, 341234123, 412341234, 1234123412, 3412341234, 12341234123, 41234123412, 341234123412, 3412341234123, 4123412341234, 12341234123412, 34123412341234, 123412341234123, 412341234123412, 3412341234123412, 34123412341234124, 41234123412341230, 123412341234123410, 341234123412341250, 1234123412341234200, 4123412341234123300, 34123412341234123000, 341234123412341260000]
// let numTure = [1, 2, 3, 4, 12, 34, 123, 412, 3412, 34123, 41234, 123412, 341234, 1234123, 4123412, 34123412, 341234123, 412341234, 1234123412, 3412341234, 12341234123, 41234123412, 341234123412, 3412341234123, 4123412341234, 12341234123412, 34123412341234, 123412341234123, 412341234123412, 3412341234123412, 34123412341234123, 41234123412341234, 123412341234123412, 341234123412341234, 1234123412341234123, 4123412341234123412, 34123412341234123412, 341234123412341234123]
// let numStr = '109600072150'

function numUp(nums = [], step) {
  nums = nums.join('').split('')
  const res = []
  let current = ''
  nums.forEach((item, index) => {
    current += `${item}`
    if ((index + 1) % step === 0) {
      res.push(current)
      current = ''
    }
  })
  if (current !== '') {
    res.push(current)
  }
  return res.map(Number)
}

function diffArray(d1, d2) {
  for (let i = 0; i < d1.length; i++) {
    // console.log(`d1[${i}]:`, d1[i], ` d2[${i}]:`, d2[i])
    if (d1[i] !== d2[i]) {
      return false
    }
  }

  return true
}

function prime(num) {
  for (let i = 2; i <= num; i++) {
    let j = 1
    let count = 0
    while (j <= i) {
      if (i % j === 0) {
        count++
      }
      j++
    }
    if (count === 2) {
      console.log(i)
      continue
    }
  }
}

function showPrime(n) {
  nextPrime:for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i); // 一个素数
  }
}

// console.log('diff numTest numMy', diffArray(numTest, numMy))
// console.log('diff numTest numTure', diffArray(numTest, numTure))
