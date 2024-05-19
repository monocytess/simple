const secondHand = document.querySelector('.hand-second')
const minuteHand = document.querySelector('.hand-minute')
const hourHand = document.querySelector('.hand-hour')

function setDate(){
  const now = new Date()

  const seconds = now.getSeconds()
  const secondsDegree = ((seconds / 60) * 360) + 90
  secondHand.style.transform = `rotate(${secondsDegree}deg)`

  const mins = now.getMinutes()
  const minsDegree = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minuteHand.style.transform = `rotate(${minsDegree}deg)`

  const hours = now.getHours()
  const hoursDegress = ((hours / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hoursDegress}deg)`
}

setInterval(setDate, 1000)

setDate()