/*
function secondIndex(text: string, symbol: string): number | null {
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

function isArmstrong(num: number): boolean {
  let numArr = `${num}`.split('')
  let total = 0
  numArr.forEach(strNum => {
    const num = Number(strNum)
    total += Math.pow(num, numArr.length)
  })

  return total === num
}

function compress(items: number[]): number[] {
  for (let i = 0; i < items.length - 1; i++) {
    if (items[i + 1] - items[i] === 0) {
      items.splice(i, 1, NaN)
    }
  }
  console.log(items)
  return items.filter(item => !isNaN(item))
}*/

function nonogramEncode_(data: string[]): number[][][] {

  return [[], []]
}

function beatPrevious(digits: string): number[] {
  if (digits.length === 1) return [Number(digits)]
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

// Test case
console.log(nonogramEncode_([" X X ", "X X X", " X X "]));