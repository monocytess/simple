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

  return [[],[]]
}

// Test case
console.log(nonogramEncode_([" X X ", "X X X", " X X "]));