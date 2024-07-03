const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
triggers.forEach(a => a.addEventListener('mouseleave', dismissHighlight))

document.body.appendChild(highlight);

function dismissHighlight() {
  this.classList.remove('a-background')
}

function highlightLink() {
  const {
    width,
    height,
    top,
    left
  } = this.getBoundingClientRect();

  const coords = {
    width,
    height,
    top: top + window.scrollY,
    left: left + window.scrollX
  }
  this.classList.add('a-background')

  Object.entries(coords).forEach(([key, value]) => {
    highlight.style[key] = `${value}px`
  })
}

