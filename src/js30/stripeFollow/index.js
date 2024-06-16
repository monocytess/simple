const triggers = document.querySelectorAll('.cool > li');

const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleMouseEnter() {
  // console.log('handleMouseEnter', this)
  this.classList.add('trigger-enter')
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150)
  background.classList.add('open')

  const dropdown = this.querySelector('.dropdown')
  const coords = dropdown.getBoundingClientRect()
  // console.log('coords >>>', coords)
  const backgroundCoords = {
    width: coords.width,
    height: coords.height,
    top: coords.top - nav.getBoundingClientRect().top,
    left: coords.left - nav.getBoundingClientRect().left,
  }

  Object.entries(backgroundCoords).forEach(([key, value]) => {
    background.style[key] = `${value}px`
  })
}

function handleMouseLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active')
  background.classList.remove('open')
}

triggers.forEach(li => li.addEventListener('mouseenter', handleMouseEnter))
triggers.forEach(li => li.addEventListener('mouseleave', handleMouseLeave))