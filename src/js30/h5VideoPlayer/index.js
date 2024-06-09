const videoSrc = [
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/PLUTO_1280x720_h264.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/Scavengers_Reign_1280x720_h264_.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/THE_FIRST_SLAM_DUNK_1280x720_h264_.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/Tanjiro_1280x720_h264.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/AGfFk_1280x720_h264.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/KICK_BACK_1280x720_h264.mp4",
  "https://ilill.oss-cn-beijing.aliyuncs.com/videos/LF_1280x720_h264_.mp4"
]
const videoInitialSetting = {
  volume: 0.6,
  speed: 1.0
}

let isPlaying = false
let duration
let format
let progressTimer = null

const video = document.querySelector('.viewer')
video.src = videoSrc[0]

const controlPanel = document.querySelector('.control-block')
const volumeRange = document.querySelector('.range-volume')
const volumeValueTips = document.querySelector('.volume-tips')

const speedRange = document.querySelector('.range-speed')
const speedValueTips = document.querySelector('.speed-tips')

const progressBar = document.querySelector('.range-progress')
const timeStart = document.getElementById('start')
const timeEnd = document.getElementById('end')

const playButtons = document.querySelectorAll('.play-box > .player__button')

const playBtn = document.querySelector('.player__button.play')
const previousBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')

const allPlayBtn = document.querySelectorAll('.player__button.play > svg')
// console.log('allPlayBtn >>>', allPlayBtn)
allPlayBtn[1].style.display = 'none'

playButtons.forEach((item) => {
  item.addEventListener('mousedown', function (event) {
    event.stopPropagation();
  })
})

video.addEventListener('loadedmetadata', function () {
  duration = video.duration
  const width = video.videoWidth
  const height = video.videoHeight
  format = getVideoFormat(video.currentSrc)
  timeEnd.innerText = formatTime(duration)

  initialSetting(videoInitialSetting, video)

  controlPanel.addEventListener('mouseenter', function (ev) {
    controlPanel.style.opacity = 0.8
  })

  controlPanel.addEventListener('mouseleave', function (ev) {
    controlPanel.style.opacity = 0.15
  })

  video.addEventListener('mouseleave', function (ev) {
    setControlOpacity('mouseleave')
  })

  video.addEventListener('mouseenter', function (ev) {
    setControlOpacity('mouseenter')
  })

  function dismissControlPanel() {
    if (!isPlaying && video.currentTime === 0) {
      controlPanel.style.opacity = 0.15
    }
  }

  function setControlOpacity(type) {
    if (controlPanel.hasAttribute('style')) {
      const currentStyles = controlPanel.getAttribute('style').split(';')
      if (currentStyles.length > 1) {
        currentStyles.forEach(item => {
          if (item.includes('opacity') && item.includes('0.15') && type === 'mouseleave') {
            controlPanel.style.opacity = 0
          } else if (item.includes('opacity') && item.includes('0') && type === 'mouseenter') {
            controlPanel.style.opacity = 0.15
          }
        })
      }
    }
  }

  delay(dismissControlPanel, 5000)
})

video.addEventListener('ended', function () {
  // console.log('video ended')
  setProgressBar('ended')
  setVideoSrc('next')
})

// 阻止滑动组件上的事件冒泡
volumeRange.addEventListener('mousedown', function (event) {
  event.stopPropagation();
});

volumeRange.addEventListener('input', function (ev) {
  volumeValueTips.innerText = `${Math.round(Number(ev.target.value))}%`
})

volumeRange.addEventListener('change', function (ev) {
  let volume = Number(ev.target.value) * 0.01
  video.volume = volume
})

speedRange.addEventListener('mousedown', function (event) {
  event.stopPropagation();
});
speedRange.addEventListener('input', function (event) {
  speedValueTips.innerText = `${event.target.value}x`
})
speedRange.addEventListener('change', function (ev) {
  video.playbackRate = ev.target.value
})

progressBar.addEventListener('mousedown', function (event) {
  event.stopPropagation();
});
progressBar.addEventListener('input', function (event) {
  video.currentTime = (duration * Number(event.target.value)) / 100
  timeStart.innerText = resetProgressTime(video.currentTime, 'start')
  timeEnd.innerText = resetProgressTime(video.currentTime, 'end')
  updateBackground()
})

playBtn.addEventListener('click', function () {
  // console.log('playBtn click >>', isPlaying)
  isPlaying = !isPlaying
  handlePlayIconChange(isPlaying)
})

previousBtn.addEventListener('click', function () {
  setVideoSrc('previous')
})

nextBtn.addEventListener('click', function () {
  setVideoSrc('next')
})

controlPanel.onmousedown = function (ev) {
  // console.log('controlPanel mousedown', ev)
  controlPanel.style.zIndex = 10

  let shiftX = ev.clientX - controlPanel.getBoundingClientRect().left
  let shiftY = ev.clientY - controlPanel.getBoundingClientRect().top

  document.body.append(controlPanel)
  moveAt(ev.pageX, ev.pageY)

  function moveAt(pageX, pageY) {
    controlPanel.style.left = pageX - shiftX + 'px'
    controlPanel.style.top = pageY - shiftY + 'px'
  }

  function onMouseMove(ev) {
    moveAt(ev.pageX, ev.pageY)
  }

  document.addEventListener('mousemove', onMouseMove)

  controlPanel.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove)
    controlPanel.onmouseup = null
  }
}

function updateBackground() {
  const value = (video.currentTime) / (duration) * 100;
  progressBar.style.background = `linear-gradient(to right, rgb(30 30 30 / 85%) ${value}%, #ccc ${value}%)`;
}

function handlePlayIconChange(canPlay = false) {
  // console.log('handlePlayIconChange canPlay >>>', canPlay)
  if (canPlay) {
    allPlayBtn[0].style.display = 'none'
    allPlayBtn[1].style.display = 'block'
    video.play()
    isPlaying = true
    setProgressBar('playing')
  } else {
    allPlayBtn[0].style.display = 'block'
    allPlayBtn[1].style.display = 'none'
    video.pause()
    isPlaying = false
    setProgressBar('paused')
  }
}

controlPanel.ondragstart = function () {
  return false
}

function setVideoSrc(type = '') {
  const index = videoSrc.indexOf(video.currentSrc)
  if (type === 'next') {
    if (index === videoSrc.length - 1) {
      video.src = videoSrc[0]
    } else {
      video.src = videoSrc[index + 1]
    }
  } else if (type === 'previous') {
    if (index === 0) {
      video.src = videoSrc[videoSrc.length - 1]
    } else {
      video.src = videoSrc[index - 1]
    }
  }

  let timer = setTimeout(() => {
    handlePlayIconChange(true)
    clearTimeout(timer)
  }, 200)
}

function setProgressBar(status = 'playing') {
  if (status === 'paused' || status === 'ended') {
    clearInterval(progressTimer)
    return
  }

  progressTimer = setInterval(() => {
    progressBar.value = (video.currentTime / duration) * 100
    timeStart.innerText = resetProgressTime(video.currentTime, 'start')
    timeEnd.innerText = resetProgressTime(video.currentTime, 'end')
    updateBackground()
  }, (1 / video.playbackRate) * 1000)
}

function getVideoFormat(url) {
  const extension = url.split('.').pop()
  return extension
}

function resetProgressTime(time, type = '') {
  switch (type) {
    case 'start': {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    case 'end': {
      const minutes = Math.floor((duration - time) / 60)
      const seconds = Math.floor((duration - time) % 60)
      return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  if (minutes === 0 && seconds === 0) {
    return '00:00'
  }
  return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function initialSetting(setting = {}, elem) {
  //设置初始化音量，播放速度
  elem.volume = setting.volume || 0.6
  elem.playbackRate = setting.speed || 1.0
}

function delay(fn, ms) {
  let timer = setTimeout(() => {
    fn && fn()
    clearTimeout(timer)
  }, ms)
}

updateBackground()
