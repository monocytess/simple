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
let videoListTimer = null
let currentVideoIndex = 0

let videoListCoords = {}

let isDragging = false;
let initialPanelX, initialPanelY;
let initialMouseX, initialMouseY;

const playerPanel = document.querySelector('.player')
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

const videoList = document.createElement('aside')
videoList.classList.add('video-list')
document.body.appendChild(videoList)
videoSrc.forEach((item, index) => {
  let videoName = item.split('/').pop().split('_').join(' ').split('.').shift()
  // console.log('videoName >>>', videoName)

  let videoItem = document.createElement('div')
  videoItem.classList.add('video-item')
  if (index === currentVideoIndex) {
    videoItem.classList.add('video-active')
  }
  videoItem.innerHTML = `<span>${videoName}</span>`
  videoList.appendChild(videoItem)
})

window.addEventListener('load', function () {
  videoListCoords = videoList.getBoundingClientRect()
  // console.log('videoListCoords >>>', videoListCoords)
})

window.addEventListener('click', function (ev) {
  // console.log('ev >>>', ev)
  let clickInSideList =
    ev.clientX > (videoListCoords.left - videoListCoords.width)
    && ev.clientX < (videoListCoords.right - videoListCoords.width)
  // console.log('clickInSideList >>>', clickInSideList)
  if (!ev.target.classList.contains('video-list') && !clickInSideList) {
    videoList.classList.remove('video-list-show')
  }
}, true)

const allScreenBtn = document.querySelectorAll('.screen')

const allPlayBtn = document.querySelectorAll('.player__button.play > svg')
// console.log('allPlayBtn >>>', allPlayBtn)
allPlayBtn[1].style.display = 'none'

playButtons.forEach((item) => {
  item.addEventListener('mousedown', function (event) {
    event.stopPropagation();
  })
})

allScreenBtn.forEach(item => {
  // console.log('item >>>', item)
  if (item.classList.contains('recover')) {
    item.classList.add('dis-miss')
  }
  item.addEventListener('click', handleScreenChange)
  item.addEventListener('mousedown', function (event) {
    event.stopPropagation();
  })
})

video.addEventListener('loadedmetadata', function () {
  duration = video.duration
  format = getVideoFormat(video.currentSrc)
  timeEnd.innerText = formatTime(duration)

  controlPanel.style.opacity = 0.8
  initialSetting(videoInitialSetting, video)

  video.addEventListener('mouseleave', () => setControlOpacity(0.15))
  video.addEventListener('mouseenter', () => setControlOpacity(0.15))
  video.addEventListener('dblclick', handleFullScreenChange)

  delay(dismissControlPanel, 5000)
})

video.addEventListener('ended', function () {
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

document.addEventListener('mouseenter', () => setControlOpacity(0.15))
document.addEventListener('mouseleave', () => setControlOpacity(0))

controlPanel.addEventListener('mouseenter', () => setControlOpacity(0.8))
controlPanel.addEventListener('mouseleave', () => setControlOpacity(0.15))

controlPanel.addEventListener('mousedown', (event) => {
  isDragging = true;
  setCoordinate(event, 'mousedown')

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
})

videoList.addEventListener('mouseenter', () => clearTimeout(videoListTimer))

videoList.addEventListener('mouseleave', () => {
  if (videoListTimer) clearTimeout(videoListTimer)
  videoListTimer = setTimeout(() => {
    clearTimeout(videoListTimer)
    videoListTimer = null
    videoList.classList.remove('video-list-show')
  }, 2000)
})

videoList.addEventListener('click', function (ev) {
  let target = getClosestDivWithClass(ev.target, 'video-item')
  // console.log('target >>>', target)

  if (target.classList.contains('video-item')) {
    let index = Array.from(target.parentElement.children).indexOf(target)
    video.src = videoSrc[index]
    currentVideoIndex = index
    setVideoActiveStatus()
    handlePlayIconChange(true)
    let timer = setTimeout(() => {
      clearTimeout(timer)
      videoList.classList.remove('video-list-show')
    }, 1000)
  }
})

function setVideoActiveStatus() {
  let videoItems = document.querySelectorAll('.video-item')

  // console.log('videoItems >>>', videoItems, currentVideoIndex)
  videoItems.forEach((item, index) => {
    if (item.classList.contains('video-active')) {
      item.classList.remove('video-active')
    }
    if (index === currentVideoIndex) {
      item.classList.add('video-active')
    }
  })
}

function handleMouseMove(ev) {
  if (!isDragging) return

  const deltaX = initialPanelX + (ev.clientX - initialMouseX);
  const deltaY = initialPanelY + (ev.clientY - initialMouseY);

  controlPanel.style.left = `${deltaX}px`;
  controlPanel.style.top = `${deltaY}px`;
}

function handleMouseUp() {
  isDragging = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

function setCoordinate(ev, evName = '') {
  if (!evName) return
  const rect = controlPanel.getBoundingClientRect();

  switch (evName) {
    case 'mousedown': {
      initialMouseX = ev.clientX;
      initialMouseY = ev.clientY;
      initialPanelX = rect.left;
      initialPanelY = rect.top;
      return;
    }
    default:
      break
  }
}

function dismissControlPanel() {
  if (!isPlaying && video.currentTime === 0) {
    controlPanel.style.opacity = 0.15
  }
}

function setControlOpacity(opacity = 0.15) {
  if (controlPanel.hasAttribute('style')) {
    const currentStyles = controlPanel.getAttribute('style').split(';')
    const targetStyle = currentStyles.find(item => item.includes('opacity'))
    // console.log('targetStyle >>>', targetStyle, typeof targetStyle, opacity)
    if (targetStyle && `${targetStyle}`.split(':')[1].trim() !== `${opacity}`) {
      controlPanel.style.opacity = opacity
    }
  }
}

function updateBackground() {
  const value = (video.currentTime) / (duration) * 100;
  progressBar.style.background = `linear-gradient(to right, rgb(30 30 30 / 85%) ${value}%, #ccc ${value}%)`;
}

function handlePlayIconChange(canPlay = false) {
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

function handleScreenChange(ev) {
  let target = getClosestDivWithClass(ev.target, 'screen')

  if (target.classList.contains('screen')) {
    let targetName = target.classList[1]
    // console.log('targetName >>>', targetName)
    if (targetName) {
      switch (targetName) {
        case 'full':
        case 'recover':
          handleFullScreenChange()
          break;
        case 'v-list':
          handleShowSideList()
          break;
        default:
          break
      }
    }
  }
}

function handleShowSideList() {
  let method = videoList.classList.contains('video-list-show') ? 'remove' : 'add'
  videoList.classList[method]('video-list-show')
}

function getClosestDivWithClass(elem, className) {
  while (elem && !elem.classList.contains(className)) {
    elem = elem.parentElement;
    if (!elem) {
      return null;
    }
  }
  return elem;
}

function handleFullScreenChange() {
  if (document.fullscreenElement) {
    document.exitFullscreen()

    if (playerPanel.classList.contains('full-play')) {
      playerPanel.classList.remove('full-play')
    }
    if (video.classList.contains('viewer-max')) {
      video.classList.remove('viewer-max')
    }
    allScreenBtn.forEach(item => {
      if (item.classList.contains('full')) {
        item.classList.remove('dis-miss')
      }
      if (item.classList.contains('recover')) {
        item.classList.add('dis-miss')
      }
    })
  } else {
    document.documentElement.requestFullscreen()
    if (!playerPanel.classList.contains('full-play')) {
      playerPanel.classList.add('full-play')
    }
    if (!video.classList.contains('viewer-max')) {
      video.classList.add('viewer-max')
    }
    document.body.style.background = 'black'
    allScreenBtn.forEach(item => {
      if (item.classList.contains('full')) {
        item.classList.add('dis-miss')
      }
      if (item.classList.contains('recover')) {
        item.classList.remove('dis-miss')
      }
    })
  }
}

function setVideoSrc(type = '') {
  const index = videoSrc.indexOf(video.currentSrc)

  if (type === 'next') {
    if (index === videoSrc.length - 1) {
      video.src = videoSrc[0]
      currentVideoIndex = 0
    } else {
      video.src = videoSrc[index + 1]
      currentVideoIndex = index + 1
    }
  } else if (type === 'previous') {
    if (index === 0) {
      video.src = videoSrc[videoSrc.length - 1]
      currentVideoIndex = videoSrc.length - 1
    } else {
      video.src = videoSrc[index - 1]
      currentVideoIndex = index - 1
    }
  }

  // console.log('setVideoSrc currentVideoIndex >>>', currentVideoIndex)
  let timer = setTimeout(() => {
    setVideoActiveStatus()
    handlePlayIconChange(true)
    clearTimeout(timer)
  }, 100)
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
