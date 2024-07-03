const secondHand = document.querySelector('.hand-second')
const minuteHand = document.querySelector('.hand-minute')
const hourHand = document.querySelector('.hand-hour')

const coverZero = 'all 0.05s cubic-bezier(0.1, 2.55, 0.5, 1)'

function setClockEffect(time, type) {
  let deg = 0
  switch (type) {
    case 'second': {
      deg = ((time / 60) * 360) + 90
      secondHand.style.transition = time === 0 ? 'none' : coverZero
      secondHand.style.transform = `rotate(${deg}deg)`
      return
    }

    case 'min': {
      deg = ((time / 60) * 360) + 90
      minuteHand.style.transition = time === 0 ? 'none' : coverZero
      minuteHand.style.transform = `rotate(${deg}deg)`
      return
    }

    case 'hours': {
      deg = ((time / 12) * 360) + 90
      hourHand.style.transition = time === 0 ? 'none' : coverZero
      hourHand.style.transform = `rotate(${deg}deg)`
      return
    }
  }
}

function setDate() {
  const now = new Date()

  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours()

  setClockEffect(seconds, 'second')
  setClockEffect(minutes, 'min')
  setClockEffect(hours, 'hours')
}

setInterval(setDate, 1000)

setDate()