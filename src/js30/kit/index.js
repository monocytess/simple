document.addEventListener('DOMContentLoaded', () => {
  const audioElements = document.querySelectorAll('audio');
  let loadedCount = 0;
  const totalAudioElements = audioElements.length;

  audioElements.forEach(audio => {
    audio.addEventListener('canplaythrough', () => {
      loadedCount++;
      if (loadedCount === totalAudioElements) {
        enablePlayFunctionality();
      }
    }, {once: true}); // The event listener will be called at most once after being added.
  });

  function enablePlayFunctionality() {
    window.addEventListener('keydown', playSound);
  }
});

const keys = document.querySelectorAll('.key')
keys.forEach(key => {
  if (isMobileDevice()) {
    key.classList.add('mobile')
  }
  key.addEventListener('transitionend', removeTransition)
})


function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function playSound(ev) {
  const audio = document.querySelector(`audio[data-key="${ev.keyCode}"]`)
  let key = document.querySelector(`.key[data-key="${ev.keyCode}"]`)
  if (!audio) return

  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
}

function removeTransition(ev) {
  if (ev.propertyName !== 'transform') return
  ev.target.classList.remove('playing')
}