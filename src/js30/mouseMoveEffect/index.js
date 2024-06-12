const hero = document.querySelector(".hero")
const texts = hero.querySelectorAll("h1")

document.addEventListener("mousemove", onMouseMove)

const walk = 100

function onMouseMove(e) {
  let target = e.target
  const {offsetWidth: width, offsetHeight: height} = hero
  let {offsetX: x, offsetY: y} = e

  if (this !== target) {
    x += target.offsetLeft
    y += target.offsetTop
  }

  const xWalk = Math.min(Math.max(Math.round((x / width) * walk - (walk - 10)), -15), 20)
  const yWalk = Math.min(Math.max(Math.round((y / height) * walk - (walk - 10)), -10), 16)

  // console.log('x:', xWalk, " y:", yWalk)

  texts.forEach((text) => {
    text.style.textShadow = `${-xWalk}px ${-yWalk}px 8px rgba(255, 255, 255, 0.7)`
  })
}

const bands = [
  "the plot in you",
  "the devil wears prada",
  "pierce the veil",
  "norma jean",
  "the bled",
  "say anything",
  "the midsummer classic",
  "we came as romans",
  "counterparts",
  "oh, sleeper",
  "a skylit drive",
  "any given day",
  "a day to remember",
  "the amity affliction",
  "architects",
  "as i lay dying",
  "atreyu",
  "august burns red",
  "beartooth",
  "blessthefall",
  "bring me the horizon",
  "burden of a day",
  "bury tomorrow",
  "chelsea grin",
  "confide",
  "crown the empire",
  "the color morale",
  "the crimson armada",
  "the devil wears prada",
  "the dillinger escape plan",
  "the ghost inside",
  "the human abstract",
  "i killed the prom queen",
  "in fear and faith",
  "in hearts wake",
  "in this moment",
  "issues",
  "iwrestledabearonce",
  "job for a cowboy",
  "killswitch engage",
  "letlive",
  "like moths to flames",
  "memphis may fire",
  "miss may i",
  "motionless in white",
  "mychildren mybride",
  "northlane",
  "of mice"
]

const bandBar = document.querySelector(".bands-bar")
const bandList = document.querySelector(".bands-list")

function addList() {
  bandList.innerHTML = bands.map((band, index) => `<li class="list-item" data-index="${index}">${band}</li>`).join("")
}

bandList.addEventListener('click', (ev) => {
  ev.preventDefault()
  let target = ev.target

  console.log('target:', target)

})

addList()