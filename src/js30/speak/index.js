window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let words = document.querySelector('.words');
let recognition = new SpeechRecognition();

let loading = document.createElement('div');
let typing = document.createElement('span');
let typingTimer = null;

recognition.lang = "zh-CN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let recognizing = false;

recognition.addEventListener('result', e => {
  const results = Array.from(e.results).map(result => result[0].transcript).join('');
  let inContainer = createLineContainer();
  let p = document.createElement('p');
  p.textContent = results;
  console.log(results);

  if (e.results[0].isFinal) {
    p.textContent += '。';
  }
  inContainer.appendChild(p);
  words.appendChild(inContainer);
});

recognition.addEventListener("audiostart", () => {
  showLoading()
  recognizing = true;
});

recognition.addEventListener("audioend", () => {
  disableTyping()
});

recognition.addEventListener('soundstart', () => {
  setLoading2Typing()
});

recognition.addEventListener('soundend', () => {
  console.log('soundend');
});

recognition.onspeechend = () => {
  recognizing = false;
  speech();
};

recognition.onspeechend = () => {
  recognizing = false;
};

recognition.addEventListener('end', () => {
  recognizing = false;
  setTimeout(() => {
    if (!recognizing) {
      speech();
    }
    cleanWrapperDom();
  }, 100);
});

recognition.addEventListener('error', e => {
  console.log('error', e);
  recognizing = false;
  if (e.error === 'no-speech' || e.error === 'network') {
    setTimeout(speech, 100);
    cleanWrapperDom();
  }
});

function speech() {
  if (!recognizing) {
    try {
      recognition.start();
      recognizing = true;
    } catch (e) {
      console.error('Error starting recognition:', e);
    }
  }
}

function createLineContainer() {
  let lineContainer = document.createElement('div');
  lineContainer.classList.add('inline-wrapper');
  return lineContainer;
}

function getLineContainer() {
  let lineContainer = document.querySelectorAll('.inline-wrapper');
  if (!lineContainer || lineContainer.length === 0) {
    lineContainer = createLineContainer();
  } else {
    lineContainer = lineContainer[lineContainer.length - 1];
  }
  return lineContainer;
}

function showLoading() {
  let inContainer = createLineContainer();
  loading.classList.add('loading');
  inContainer.appendChild(loading);
  words.appendChild(inContainer);
}

function setLoading2Typing() {
  let inContainer = getLineContainer();

  loading.classList.remove('loading');
  typing.textContent = '正在听...';
  typingTimer = setInterval(() => {
    if (typing.textContent.length < 10) {
      typing.textContent += '.';
    } else {
      typing.textContent = '正在听';
    }
  }, 250);
  inContainer.appendChild(typing);
}

function disableTyping() {
  loading.classList.add('loading');
  typing.textContent = '';
  clearInterval(typingTimer);
}

function cleanWrapperDom() {
  let lineContainer = document.querySelectorAll('.inline-wrapper');
  lineContainer.forEach((container) => {
    // console.log('container', container, container.children.length);
    if (container.children.length === 0) {
      container.remove();
    }
  });
}

speech();
