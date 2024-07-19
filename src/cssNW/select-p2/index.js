/*
const moveElem = document.querySelector('.move')

let dragging
let tLeft, tTop

document.addEventListener('mousedown', function (e) {
  if (e.target === moveElem) {
    dragging = true
    let moveElement = moveElem.getBoundingClientRect()
    tLeft = e.clientX - moveElement.left
    tTop = e.clientY - moveElement.top
  }
})

document.addEventListener('mouseup', function (ev) {
  dragging = false
})

document.addEventListener('mousemove', function (ev) {
  if (dragging) {
    let moveX = ev.clientX - tLeft
    let moveY = ev.clientY - tTop

    moveElem.style.left = moveX + 'px'
    moveElem.style.top = moveY + 'px'
  }
})*/


document.querySelectorAll('.pie').forEach(function (pie) {
  let p = parseFloat(pie.textContent)
  pie.style.animationDelay = '-' + p + 's'
})