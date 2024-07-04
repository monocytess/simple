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