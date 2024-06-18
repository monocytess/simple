const gameArea = document.querySelector('.game-area');
const bar = document.querySelector('.bar-box')

const startButton = document.querySelector('.start')
const audio = document.querySelector('.brandish')
const getScoreAudio = document.querySelector('.get-source')
const selects = document.querySelectorAll('select');

let heightBar = 0
let widthBar = 0

const holeImage = 'https://ilill.oss-cn-beijing.aliyuncs.com/js30/whack/pic_ground.png'
const moleImage = 'https://ilill.oss-cn-beijing.aliyuncs.com/js30/whack/pic_mouse.png'

const baseBlock = [
  {id: 'hole1', className: 'hole hole1'},
  {id: 'hole2', className: 'hole hole2'},
  {id: 'hole3', className: 'hole hole3'},
  {id: 'hole4', className: 'hole hole4'},
  {id: 'hole5', className: 'hole hole5'},
  {id: 'hole6', className: 'hole hole6'},
]

baseBlock.forEach((block) => {
  const hole = document.createElement('div');
  hole.id = block.id;
  hole.className = block.className;

  const mole = document.createElement('div');
  mole.className = 'mole';
  const moleImg = document.createElement('img');
  moleImg.src = moleImage;
  moleImg.alt = 'mouse';
  moleImg.classList.add('mole-img')
  moleImg.addEventListener('dragstart', (event) => event.preventDefault());
  moleImg.addEventListener('mousedown', (event) => event.preventDefault());
  mole.appendChild(moleImg)

  hole.appendChild(mole)

  const ground = document.createElement('div');
  ground.className = 'ground';

  const groundImg = document.createElement('img');
  groundImg.src = holeImage;
  groundImg.alt = 'ground';
  groundImg.classList.add('ground-img')
  ground.appendChild(groundImg)

  hole.appendChild(ground)

  gameArea.appendChild(hole);
})

const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole-img');

let lastMole;
let timeUp = false;
let score = 0;
let countTime = 30;

let min = 800;
let max = 2000;

function randomTime(_min = min, _max = max) {
  return Math.round(Math.random() * (_max - _min) + _min);
}

function randomMoles(moles) {
  const idx = Math.floor(Math.random() * moles.length);
  const mole = moles[idx];
  if (mole === lastMole) {
    return randomMoles(moles);
  }
  lastMole = mole;
  return mole;
}

startButton.addEventListener('click', () => {
  if (!timeUp) {
    setGameTimeCountDown()
    peep()
  }
})

function peep() {
  const time = randomTime();
  const mole = randomMoles(moles);
  mole.classList.add('up');
  let timer = setTimeout(() => {
    mole.classList.remove('up');
    if (!timeUp) {
      peep();
    } else {
      clearTimeout(timer)
      return
    }
  }, time);
}

function setGameTimeCountDown() {
  setSelectStatus(selects, 'setAttribute')
  let time = countTime;
  let countDownTimer = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(countDownTimer)
      timeUp = true
      startButton.textContent = 'Game Over'
      setSelectStatus(selects, 'removeAttribute')
      let timer = setTimeout(() => {
        clearTimeout(timer)
        timeUp = false
        startButton.textContent = 'Start'
        score = 0;
        scoreBoard.textContent = 0;
      }, 5000)
    }
    startButton.textContent = time
  }, 1000)
}

moles.forEach((mole) => {
  mole.addEventListener('click', () => {
    if (!mole.classList.contains('up')) return;
    mole.classList.remove('up');
    score++;
    scoreBoard.textContent = score;
    getScoreAudio.play()
  });
})

gameArea.addEventListener('mouseenter', () => {
  // console.log('mouseenter')
  bar.style.display = 'block'
  const coords = bar.getBoundingClientRect()
  heightBar = coords.height
  widthBar = coords.width
})

gameArea.addEventListener('mouseleave', () => {
  // console.log('mouseleave')
  bar.style.display = 'none'
})

gameArea.addEventListener('mousemove', throttle(handleMouseMove, 100))

gameArea.addEventListener('click', handleClick)

audio.addEventListener('ended', () => {
  bar.classList.remove('hit')
})

selects.forEach(select => {
  select.addEventListener('change', function (e) {

    let target = e.target
    // console.log('target id >>>', target.id)
    if (!target.id) return

    if (target.id === 'select-hard') {
      switch (target.value) {
        case 'easy':
          min = 800;
          max = 2000;
          break;
        case 'medium':
          min = 500;
          max = 1500;
          break;
        case 'hard':
          min = 200;
          max = 1000;
          break;
      }
    } else if (target.id === 'select-time') {
      countTime = Number(target.value)
    }
  })
})

function setSelectStatus(selects, mothod = 'setAttribute') {
  selects.forEach(select => {
    select[mothod]('disabled', 'disabled')
  })
}

function handleClick(event) {
  audio.play()
  bar.classList.add('hit')
}

function handleMouseMove(event) {
  const x = event.pageX;
  const y = event.pageY;
  // console.log(x, y)
  bar.style.left = `${x - widthBar / 2}px`
  bar.style.top = `${y - heightBar / 2}px`
}

function throttle(callback, limit) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}
