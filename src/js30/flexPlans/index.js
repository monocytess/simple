const panels = document.querySelectorAll('.panel');
const bubble = document.querySelector('.bubble');

function toggleOpen() {
  this.classList.toggle('open');
  bubble.play()
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));

panels.forEach(panel => panel.addEventListener('transitionend', function (e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}));