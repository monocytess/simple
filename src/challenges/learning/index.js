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

function removeAllBefore(values, b) {
  return values.includes(b) ? values.slice(values.indexOf(b)) : values
}

function biggerPrice(limit, data) {
  data.sort((a, b) => {
    return b.price - a.price
  })

  return data.slice(0, limit)
}

function betweenMarkers(text, begin, end) {
  return text.slice(
    text.indexOf(begin) === -1 ? 0 : text.indexOf(begin) + begin.length,
    text.indexOf(end) === -1 ? text.length : text.indexOf(end)
  )
}

function splitPairs(text) {
  text = text.length % 2 === 0 ? text : text + '_'
  let res = []
  let i = 0

  while (res.length * 2 !== text.length) {
    res.push(text.slice(i, i + 2))
    i += 2
  }

  return res
}

function nearestValue(values, s) {
  let collects = []

  for (let i = 0; i < values.length; i++) {
    let diff = Math.abs(s - values[i])
    if (diff === 0) return values[i]

    diff = Math.abs(s - values[i])
    collects.push(diff)
  }
  console.log(collects)

  return values[collects.indexOf(Math.min(...collects))]
}

function nonUniqueElements(data) {
  let filters = []
  for (let i = 0; i < data.length; i++) {
    let [k] = data.splice(i, 1)
    if (data.includes(k)) {
      filters.push(k)
      data.splice(i, 0, k)
    } else {
      data.splice(i, 0, NaN)
    }
  }
  console.log('data >>', data)

  return filters
}

function popularWords(text, words) {
  const res = {}

  words.forEach(item => {
    res[item] = text.match(new RegExp(`\\b${item}\\b`, 'gi'))?.length || 0
  })

  return res
}

function secondIndex(text, symbol) {
  let strings = text.split('')
  let count = 0
  for (let i = 0; i < strings.length; i++) {
    if (symbol === strings[i]) count++
    if (count === 2) {
      return i
    }
  }

  return null
}

function frequencySort(items = []) {
  const map = new Map()
  let arr = []

  items.forEach(item => {
    if (map.has(item)) {
      let t = map.get(item)
      t++
      map.set(item, t)
    } else {
      map.set(item, 1)
    }
  })

  let map2Arr = Array.from(map)
  map2Arr.sort((a, b) => b[1] - a[1])

  for (const [key, value] of map2Arr) {
    console.log(key, value)
    arr = arr.concat(Array(value).fill(key))
  }
  console.log('arr', arr)

  return arr
}

function toTitleCase(sentence) {
  if (sentence === '') return ''
  let arr = []

  sentence.toLowerCase().split(' ').forEach(str => arr.push(str.charAt(0).toUpperCase() + str.substring(1)))

  return arr.join(' ')
}

function longestWord(sentence) {
  if (!sentence) return ''
  let strAr = sentence.split(' ')
  const collect = []
  strAr.forEach((item, index) => {
    collect[index] = item.length
  })

  return strAr[collect.indexOf(Math.max(...collect))]
}

function isArmstrong(num) {
  let numArr = `${num}`.split('')
  let total = 0
  numArr.forEach(num => {
    num = Number(num)
    total += Math.pow(num, numArr.length)
  })

  return total === num
}

function correctSentence(text) {
  text = /^[A-Z]/g.test(text) ? text : text.charAt(0).toUpperCase() + text.slice(1)
  text = /\.$/g.test(text) ? text : text + '.'

  return text
}

function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1)
}

function countOccurrences(mainStr, subStr) {
  mainStr = mainStr.toLowerCase()
  subStr = subStr.toLowerCase()

  // 创建一个正则表达式以匹配所有重叠的子字符串
  const regex = new RegExp(`(?=${subStr})`, 'g');

  // 使用正则表达式匹配并返回匹配的次数
  return (mainStr.match(regex) || []).length;
}

function longestPrefix(arr) {
  arr.sort((a, b) => a.length - b.length)
  let mark = arr[0]
  let res = ''

  for (let i = 0; i < mark.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (mark[i] !== arr[j][i]) {
        return res
      }
    }
    res += mark[i]
  }

  return res
}

function longestSubstr(s = '') {
  let strArr = s.split('')

  let maxLen = 0
  let current = []
  for (let i = 0; i < strArr.length; i++) {
    let len = Math.max(current.length - 1, 0)
    if (current[len] !== strArr[i]) {
      // 情况1: 第一个
      if (current.includes(strArr[i])) {
        current.push(strArr[i])
        current.shift()
      } else {
        current.push(strArr[i])
      }
    } else {
      // 情况1: 最后一个
      current.length = 0
      current.push(strArr[i])
    }

    maxLen = Math.max(maxLen, current.length)
  }
  return maxLen
}

function fuzzyStringMatch(str1, str2, threshold) {
  // 如果字符串长度差异大于允许的字符差异数，直接返回false
  if (Math.abs(str1.length - str2.length) > threshold) {
    return false;
  }

  // 计算两个字符串中不同字符的数量
  let differenceCount = 0;
  const maxLength = Math.max(str1.length, str2.length);

  for (let i = 0; i < maxLength; i++) {
    if (str1[i] !== str2[i]) {
      differenceCount++;
    }
    // 如果不同字符的数量超过了允许的字符差异数，直接返回false
    if (differenceCount > threshold) {
      return false;
    }
  }

  // 如果不同字符的数量在允许范围内，返回true
  return true;
}

function exceptZero(items) {
  // 先收集所有非零的元素，并排序
  const sortedNonZeroItems = items.filter(item => item !== 0).sort((a, b) => a - b);

  // 重新组装数组，将0放回原来的位置
  let sortedIndex = 0;
  return items.map(item => (item === 0 ? 0 : sortedNonZeroItems[sortedIndex++]));
}

function covertNumber(n1, n2) {
  if (n1 - n2 === 0) return 0
  if (n1 - n2 < 0) return -1

  return 1
}

function changingDirection(elements) {
  if (elements.length <= 1) return 0
  let prevDiff = covertNumber(elements[1], elements[0])
  let count = 0

  for (let i = 1; i < elements.length - 1; i++) {
    let diff = covertNumber(elements[i + 1], elements[i])
    if (diff * prevDiff < 0) {
      count++
    }
    if (diff !== 0) {
      prevDiff = diff
    }
  }

  return count
}

function convertDate(date) {
  const dateArr = date.split('/')
  if (dateArr.length !== 3) return 'Error: Invalid date.'
  let [day, month, year] = dateArr.map(Number)
  if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Error: Invalid date.'

  const dateObj = new Date(year, month - 1, day)
  if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
    return 'Error: Invalid date.'
  }

  const formattedYear = dateObj.getFullYear();
  const formattedMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const formattedDay = dateObj.getDate().toString().padStart(2, '0');

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

function strictEqual(N) {
  if (N <= 1) return N
  return N + strictEqual(N - 1)
}

function maxDigit(value) {
  let numArr = `${value}`.split('').map(Number)
  return Math.max(...numArr)
}

function quadraticRoots(a, b, c) {
  let x1 = (-b + Math.sqrt((Math.pow(b, 2) - 4 * a * c))) / (2 * a)
  let x2 = (-b - Math.sqrt((Math.pow(b, 2) - 4 * a * c))) / (2 * a)

  if (isNaN(x1) || isNaN(x2)) return ["No real roots"]

  return [x1, x2]
}

function indexPower(ar, n) {
  if (n >= ar.length) return -1

  return Math.pow(ar[n], n)
}

function isPerfect(n) {
  let count = 0
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) {
      count += i
    }
  }
  return count === n
}

function endZeros(a) {
  let count = 0

  while (a % 10 === 0) {
    count++
    if (a === 0) return count
    a = a / 10
  }

  return count
}

function countDivisible(n, k) {
  let count = 0
  let i = 1
  while (i <= n) {
    if (i++ % k === 0) count++
  }

  return count
}

function isometricStrings(line1, line2) {
  let l1Arr = line1.split('')
  let l2Arr = line2.split('')
  let map = new Map()

  for (let i = 0; i < l1Arr.length; i++) {
    if (map.has(l1Arr[i])) {
      if (map.get(l1Arr[i]) !== l2Arr[i]) {
        return false
      }
    } else {
      map.set(l1Arr[i], l2Arr[i])
    }
  }

  return true
}

function sumNumbers(text) {
  let numArr = text.split(' ')
  let total = 0
  for (const numStr of numArr) {
    total += !isNaN(Number(numStr)) ? Number(numStr) : 0
  }
  return total
}

function formatWords(text) {
  if (/^\W/.test(text)) {
    return formatWords(text.slice(1))
  }
  if (/\W$/.test(text)) {
    return formatWords(text.slice(0, text.length - 1))
  }
  return text
}

function firstWord(text) {
  let textArr = text.split(' ')
  let fl = ''
  for (let i = 0; i < textArr.length; i++) {
    if (/\w/.test(`${textArr[i]}`)) {
      fl = textArr[i]
      break
    }
  }
  fl = formatWords(fl)
  const regex = /[!"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
  if (!regex.test(fl)) {
    return fl
  }
  let index = fl.split('').findIndex(item => regex.test(item))
  // console.log('index >>', index)

  return fl.slice(0, index)
}

function formatEnd(text) {
  if (text.endsWith('\n')) {
    return formatEnd(text.slice(0, text.length - 1))
  }
  return text
}

function nonEmptyLines(text) {
  let total = 0
  let tt = formatEnd(text.trim())
  for (let t of tt.split('\n')) {
    if (t.trim() !== '') {
      total++
    }
  }
  return total
}

function columnNumber(name) {
  let total = 0
  let wArr = name.split('')
  let len = wArr.length

  wArr.forEach(item => {
    total += (`${item}`.charCodeAt(0) - 64) * Math.pow(--len <= 0 ? 1 : 26, Math.max(0, len))
  })

  return total
}

function sortByExt(files) {
  let noNames = []
  let noExt = []
  let others = []

  for (let i = 0; i < files.length; i++) {
    let lIndex = files[i].lastIndexOf('.')
    if (lIndex === 0) {
      noNames.push(files[i])
    } else if (lIndex === files[i].length - 1) {
      noExt.push(files[i])
    } else {
      others.push(files[i])
    }
  }

  others.sort((a, b) => {
    const nA = a.slice(0, a.lastIndexOf('.'));
    const nB = b.slice(0, b.lastIndexOf('.'));

    if (nA < nB) return -1
    if (nA > nB) return 1
    return 0
  })

  return [].concat(noNames.sort()).concat(noExt.sort()).concat(others.sort((a, b) => {
    const extA = a.slice(a.lastIndexOf('.'));
    const extB = b.slice(b.lastIndexOf('.'));

    if (extA < extB) return -1;
    if (extA > extB) return 1;
    return 0;
  }))
}

function moveZeros(items) {
  const collections = []
  let zeros = []
  items.forEach(item => item !== 0 ? collections.push(item) : item)

  if (collections.length < items.length) {
    zeros = Array(items.length - collections.length).fill(0)
  }

  return collections.concat(zeros)
}

function switchDict(data) {
  const obj = {}

  for (const [key, value] of Object.entries(data)) {
    if (!obj.hasOwnProperty(`${value}`)) {
      obj[`${value}`] = new Set()
    }
    obj[`${value}`].add(key)
  }

  return obj
}

function compress(items) {
  for (let i = 0; i < items.length - 1; i++) {
    if (items[i + 1] - items[i] === 0) {
      items.splice(i, 1, '')
    }
  }
  return items.filter(item => typeof item === 'number')
}

function chunkingBy(items, size) {
  if (items.length === 0) return []
  if (size >= items.length) return [items]

  const res = []
  for (let i = 0; i < Math.ceil(items.length / size); i++) {
    res.push(items.slice(i * size, (i + 1) * size))
  }
  return res
}

function replaceBiggest(data) {
  const n = data.length;
  if (n === 0) return [];

  // 初始化结果数组
  const result = new Array(n);

  // 初始化当前最大值为 -1
  let maxRight = -1;

  // 从右向左遍历数组
  for (let i = n - 1; i >= 0; i--) {
    // 将当前最大值放入结果数组中
    result[i] = maxRight;

    // 更新当前最大值
    if (data[i] > maxRight) {
      maxRight = data[i];
    }
  }

  return result;
}

function aggrOperation(data) {
  const res = {}

  data.forEach(([key, value]) => {
    const symbol = key[0];
    const mainKey = key.slice(1);
    const numValue = Number(value);

    if (!res.hasOwnProperty(mainKey)) {
      res[mainKey] = symbol === '-' ? -numValue : numValue;
    } else {
      switch (symbol) {
        case '+':
          res[mainKey] += numValue;
          break;
        case '-':
          res[mainKey] -= numValue;
          break;
        case '*':
          res[mainKey] *= numValue;
          break;
        case '/':
          res[mainKey] = numValue === 0 ? res[mainKey] : res[mainKey] / numValue;
          break;
        case '=':
          res[mainKey] = numValue;
          break;
        default:
          res[mainKey] += numValue; // default to addition if no symbol
          break;
      }
    }
  })

  const result = {};
  for (const key in res) {
    if (res[key] !== 0 && key !== '') {
      result[key] = res[key];
    }
  }

  return result;
}

function nonogramEncode_(data) {
  const numRows = data.length;
  const numColumns = data[0].length;
  const columnClues = Array.from({length: numColumns}, () => []);

  const rowClues = data.map(row => {
    const clues = [];
    let count = 0;
    for (let char of row) {
      if (char === 'X') {
        count++;
      } else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    return clues;
  });

  for (let col = 0; col < numColumns; col++) {
    let count = 0;
    for (let row = 0; row < numRows; row++) {
      if (data[row][col] === 'X') {
        count++;
      } else if (count > 0) {
        columnClues[col].push(count);
        count = 0;
      }
    }
    if (count > 0) {
      columnClues[col].push(count);
    }
  }

  const maxRowCluesLength = Math.max(...rowClues.map(clue => clue.length));
  const rowCluesNormalized = rowClues.map(clue => [...Array(maxRowCluesLength - clue.length).fill(0), ...clue]);

  const maxColumnCluesLength = Math.max(...columnClues.map(clue => clue.length));
  const columnCluesNormalized = columnClues.map(clue => {
    const padding = Array(maxColumnCluesLength - clue.length).fill(0);
    return padding.concat(clue);
  });

  const column_ = []
  for (let i = 0; i < columnCluesNormalized[0].length; i++) {
    let tc = []
    columnCluesNormalized.forEach(item => tc.push(item[i]))
    column_.push(tc)
  }

  return [column_, rowCluesNormalized];
}

// Test case
// console.log(nonogramEncode_([" X X ", "X X X", " X X "]));
// console.log(nonogramEncode_(["X"]));
// console.log(nonogramEncode_(["XX   X"," X XXX"," X XX "," XXX  "," XXXX ","   X  "]))

function isAllUpper(text) {
  const regex = /^[A-Z\s\d]*[A-Z]+[A-Z\s\d]*$/;
  return regex.test(text);
}

function createZigzag(rows, cols, start = 1) {
  let res = []
  for (let i = 0; i < rows; i++) {
    let _cols = Array(cols).fill(start).map((t, i) => t + i)
    start = _cols[cols - 1] + 1
    if (i % 2 !== 0) {
      _cols.reverse()
    }
    res.push(_cols)
  }
  return res
}

function wordsOrder(text, words) {
  let textArr = text.split(' ')
  for (let word of words) {
    if (!textArr.includes(word)) return false
  }

  let set = new Set(words)
  if (words.length !== set.size) return false

  let sortArray = Array(textArr.length).fill(-1)
  for (let i = 0; i < textArr.length; i++) {
    if (words.includes(textArr[i])) {
      let index = words.indexOf(textArr[i])
      sortArray[i] = index
      words.splice(index, 1, '__')
    }
  }

  let res = sortArray.filter(item => item !== -1)
  for (let i = 0; i < res.length - 1; i++) {
    if (res[i + 1] - res[i] <= 0) return false
  }

  return true
}

function removeAfterKth(items, k) {
  if (k === 0) return []

  let res = []

  items.forEach(item => {
    if (res.filter(i => i === item).length < k) {
      res.push(item)
    }
  })

  return res
}

function sortedGroups(items) {
  if (items.length <= 1) return items

  const result = []
  let temp = [items[0]];

  for (let i = 1; i < items.length; i++) {
    // 判断当前元素与前一个元素的大小关系
    const isAscending = items[i] >= items[i - 1];
    const wasAscending = temp.length > 1 ? temp[temp.length - 1] >= temp[temp.length - 2] : isAscending;

    if ((isAscending && wasAscending) || (!isAscending && !wasAscending)) {
      // 如果当前元素与temp中最后一个元素保持相同的大小关系，则添加到temp
      temp.push(items[i]);
    } else {
      // 如果当前元素与temp中最后一个元素的大小关系不同，则将temp添加到result，并重置temp
      result.push(temp);
      temp = [items[i]];
    }
  }

  // 确保最后一个temp被添加到result
  if (temp.length > 0) {
    result.push(temp);
  }
  return result.sort().flat(Infinity);
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