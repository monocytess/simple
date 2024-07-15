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

function isMajority(items) {
  if (items.length === 0) return false
  if (items.length === 1) return items[0]

  return items.filter(item => item === true).length > items.length / 2
}

function sumDigits(num) {
  const items = `${num}`.split('')
  if (items.length === 1) return Number(items[0])
  return sumDigits(items.map(Number).reduce((prev, current) => {
    return prev + current
  }, 0))
}

function correctCapital(line) {
  let allUp = new RegExp(/^[A-Z]+$/)
  let allLower = new RegExp(/^[a-z]+$/)
  let capitalized = new RegExp(/^[A-Z][a-z]*$/)

  return allUp.test(line) || allLower.test(line) || capitalized.test(line)
}

function absoluteSorting(values) {
  const resetArr = []
  values.forEach(item => {
    resetArr.push({
      item: Math.abs(item),
      key: item < 0 ? -1 : 1
    })
  })
  resetArr.sort((a, b) => {
    const diff = a.item - b.item
    if (diff < 0) return -1
    if (diff > 0) return 1
    return 0
  })

  return resetArr.map(t => {
    return t.item * t.key
  })
}

function goesAfter(word, first, second) {
  if (first === second) return false
  const _words = `${word}`.split('')
  if (!_words.includes(first) || !_words.includes(second)) return false

  return _words.indexOf(second) - _words.indexOf(first) === 1
}

function longPressed(text, typed) {
  if (text === typed) return false
  let i = 0
  let j = 0
  while (j < typed.length) {
    if (i < text.length && text[i] === typed[j]) {
      i++;
      j++;
    } else if (j > 0 && typed[j] === typed[j - 1]) {
      j++
    } else {
      return false
    }
  }

  return i === text.length
}

function compressWords(words = '') {
  return words.split('').reduce((acc, char) => {
    if (acc.length === 0 || acc[acc.length - 1] !== char) {
      acc += char;
    }
    return acc;
  }, '');
}

function timeConverter(dayTime) {
  let [hours, minutes] = dayTime.split(':')
  hours = Number(hours)
  let tips = hours >= 12 && hours < 24 ? 'p' : 'a'
  if (hours === 0) {
    hours = 12
  }
  return hours > 12 ? `${hours - 12}:${minutes} ${tips}.m.` : `${hours}:${minutes} ${tips}.m.`
}

function sumByTypes(values) {
  let str = ''
  let num = 0

  values.forEach(item => {
    switch (typeof item) {
      case 'string':
        str += item
        break
      case 'number':
        num += item
        break
    }
  })

  return [str, num]
}

function translation(text) {
  const vowels = 'aeiouy'

  function translatedWord(word) {
    let result = ''
    let i = 0

    while (i < word.length) {
      result += word[i]
      if (vowels.includes(word[i])) {
        i += 3
      } else {
        i += 2
      }
    }

    return result
  }

  return text.split(' ').map(translatedWord).join(' ')
}

function commonWords(line1, line2) {
  let larr1 = line1.split(',')
  let larr2 = line2.split(',')

  const coll = []

  for (let i = 0; i < larr1.length; i++) {
    if (larr2.includes(larr1[i])) {
      coll.push(larr1[i])
    }
  }
  coll.sort()
  return coll.join(',')
}

function follow(instructions) {
  const ins = instructions.split('')
  let f = ins.filter(item => item === 'f').length
  let b = ins.filter(item => item === 'b').length
  let l = ins.filter(item => item === 'l').length
  let r = ins.filter(item => item === 'r').length

  return [r + l * (-1), f + b * (-1)]
}

function checkPangram(text) {
  let tArr = text.toLowerCase().split('').sort()
  return Array.from(new Set(tArr)).join('').includes('abcdefghijklmnopqrstuvwxyz')
}

function mostNumbers(...args) {
  if (args.length === 0) return 0
  const base = 1e6
  args = args.map(item => item * base)

  return (Math.max(...args) - Math.min(...args)) / base
}

function findQuotes(text) {
  let res = []
  let i = 0
  let left = NaN
  while (i < text.length) {
    if (text[i] === '"') {
      if (!isNaN(left)) {
        res.push(text.slice(left, i))
        left = NaN
      } else {
        left = i + 1
      }
    }
    i++
  }

  return res
}

function longRepeat(line) {
  let lineArr = line.split('')
  let str = ''
  let live = 0

  let max = 0
  let i = 0
  while (i < lineArr.length) {
    if (!str.endsWith(lineArr[i])) {
      str += lineArr[i]
      live = 1
    } else {
      live++
    }
    max = Math.max(max, live)
    i++
  }

  return max
}

function switchStrings(line, result) {
  if (line === result) return true
  if (line.length !== result.length) return false
  let diffCount = 0;
  let diffIndex1 = -1;
  let diffIndex2 = -1;

  for (let i = 0; i < line.length; i++) {
    if (line[i] !== result[i]) {
      diffCount++;
      if (diffCount === 1) {
        diffIndex1 = i;
      } else if (diffCount === 2) {
        diffIndex2 = i;
      }
    }
  }

  return diffCount === 2 &&
    line[diffIndex1] === result[diffIndex2] &&
    line[diffIndex2] === result[diffIndex1];
}
