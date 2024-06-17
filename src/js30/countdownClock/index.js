const headerBlock = document.querySelector('.header-block');
const navBar = document.querySelector('nav');

const selects = document.querySelectorAll('select');
const customInput = document.querySelector('.input-custom');

let countDown;

customInput.addEventListener('blur', function (e) {
  // console.log(e.target.value)
  let tValue = e.target.value;
  if (tValue || Number(tValue)) {
    tValue = Math.floor(Number(tValue))
  }

  tValue && countDownTime(tValue * 60)
  this.value = ''
  resetSelectsAndInput(this);
})

customInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    let tValue = e.target.value;
    if (tValue || Number(tValue)) {
      tValue = Math.floor(Number(tValue))
    }

    tValue && countDownTime(tValue * 60)
    this.value = ''
    resetSelectsAndInput(this);
  }
})

selects.forEach(select => {
  select.addEventListener('change', function (e) {
    // console.log(e.target.value, e, this)
    let seconds = Math.floor((new Date(`${e.target.value} 00:00:00`).getTime() - new Date().getTime()) / 1000);
    // console.log('seconds: ', seconds)
    countDownTime(seconds)
    resetSelectsAndInput(this);
  })
})

function resetSelectsAndInput(elem) {
  selects.forEach(select => {
    if (select !== elem) {
      select.value = ''
    }
  })
  if (elem !== customInput) {
    customInput.value = ''
  }
}

function fixedNav() {
  let method = window.scrollY >= headerBlock.offsetHeight ? 'add' : 'remove';
  navBar.classList[method]('fixed-nav');
}

function countDownTime(time) {
  displayLeft(time)
  clearInterval(countDown)

  countDown = setInterval(() => {
    if (time <= 0 || time === undefined || time === null) {
      clearInterval(countDown)
      return
    }

    time--
    displayLeft(time)
  }, 1000)
}

function displayLeft(second) {
  const params = {
    day: getTimeFormat(second, 'day'),
    hour: getTimeFormat(second, 'hour'),
    minute: getTimeFormat(second, 'minute'),
    second: getTimeFormat(second, 'second')
  }

  document.title = `${params.day}d ${params.hour}h ${params.minute}m ${params.second}s`

  Object.entries(params).forEach(([key, value]) => {
    document.querySelector(`.${key}-number`).textContent = value
  })
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

function getTimeFormat(time, format) {
  let result = ''

  switch (format) {
    case 'day':
      result = Math.floor(time / (60 * 60 * 24))
      break
    case 'hour':
      result = Math.floor((time % (60 * 60 * 24)) / (60 * 60))
      break
    case 'minute':
      result = Math.floor((time % (60 * 60)) / 60)
      break
    case 'second':
      result = time % 60
      break
    default:
      break
  }

  return formatTime(result)
}

window.addEventListener('scroll', fixedNav)