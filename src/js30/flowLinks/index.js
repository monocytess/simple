const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
const navBar = document.querySelector('.nav');
const headerBlock = document.querySelector('.top-block');

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
triggers.forEach(a => a.addEventListener('mouseleave', dismissHighlight))

document.body.appendChild(highlight);
let navBarHeight = navBar.offsetHeight;

window.addEventListener('load', function () {
  const coords = navBar.getBoundingClientRect();
  navBarHeight = coords.height;
})

function dismissHighlight() {
  highlight.classList.remove('highlight');
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
  // console.log('coords: ', coords)
  this.classList.add('a-background')

  Object.entries(coords).forEach(([key, value]) => {
    highlight.style[key] = `${value}px`
  })
}

function fixedNav() {
  let method = window.scrollY >= headerBlock.offsetHeight ? 'add' : 'remove';
  navBar.classList[method]('fixed-nav');
  document.body.style.paddingTop = method === 'add' ? navBar.offsetHeight + 'px' : 0
}

window.addEventListener('scroll', fixedNav)