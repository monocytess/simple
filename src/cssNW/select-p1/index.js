let popup = document.querySelector('.popup')

document.querySelector('.linear-5').addEventListener('click', function (e) {
  console.log('btn click')
  popup.classList.add('active')
})

document.querySelector('.popup-content').addEventListener('click', function () {
  popup.classList.remove('active')
})
