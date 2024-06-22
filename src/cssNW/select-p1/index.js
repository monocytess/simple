let eleStyle = document.createElement('style')
document.head.appendChild(eleStyle)

let input = document.querySelector('input[type="search"]')

input.addEventListener('input', function(e) {
  let value = this.value.trim()

  eleStyle.innerHTML = value ? '[data-search]:not([data-search*="' + value + '" i]) {display: none;}' : ''
})