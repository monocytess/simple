const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
triggers.forEach(a => a.addEventListener('mouseleave', () => highlight.classList.remove('highlight')))

document.body.appendChild(highlight);

function highlightLink(e) {
  const linkCoords = this.getBoundingClientRect();
  const coords = {
    width: linkCoords.width + 'px',
    height: linkCoords.height + 'px',
    top: linkCoords.top + window.scrollY + 'px',
    left: linkCoords.left + window.scrollX + 'px',
    transform: `translate(${window.scrollX}px, ${window.scrollY}px)`
  }

  // console.log('coords >>>', coords)
  highlight.classList.add('highlight');

  Object.entries(coords).forEach(([key, value]) => {
    highlight.style[key] = value;
  })
}