const navBar = document.querySelector('nav')
const topImage = document.querySelector('.top-image-container')
const logoText = document.querySelector('.logo > a')

function fixNav() {
  let method = window.scrollY >= topImage.offsetHeight ? 'add' : 'remove'
  navBar.classList[method]('fixed-nav')
  document.body.style.paddingTop = method === 'add' ? navBar.offsetHeight + 'px' : 0
  logoText.style.color = method === 'add' ? 'black' : 'white'
}

window.addEventListener('scroll', fixNav);