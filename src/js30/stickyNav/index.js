const topImage = document.querySelector('.top-image-container')
const logoText = document.querySelector('.logo > a')
const logo = document.querySelector('.logo')

function fixNav() {
  logo.style.maxWidth = `${Math.max(Math.min(100, window.scrollY - topImage.offsetHeight), 0)}%`
  logoText.style.color = window.scrollY >= topImage.offsetHeight ? 'black' : 'white'
}

window.addEventListener('scroll', fixNav);