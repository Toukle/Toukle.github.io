function search() {
  var searchInput = document.getElementById("input").value;
  
  if (searchInput.trim() === "") {
    return;
  }
  
  var searchURL = "https://www.google.com/search?q=" + encodeURIComponent(searchInput);
  openInNewTab(searchURL);
}

function openInNewTab(url) {
  var newTab = window.open(url);
  newTab.focus();
}

function handleKeyDown(event) {
  if (event.keyCode === 13) {
    search();
  }
}

var inputField = document.getElementById("input");
inputField.addEventListener("keydown", handleKeyDown);

document.getElementById('settings').addEventListener('click', function(event) {
  var settingsmenu = document.getElementById('settingsmenu');
  if (settingsmenu.style.display === 'none') {
    settingsmenu.style.display = 'block';
  } else {
    settingsmenu.style.display = 'none';
  }
  event.stopPropagation();
});

document.addEventListener('click', function(event) {
  var settingsmenu = document.getElementById('settingsmenu');
  var isClickInsideMenu = settingsmenu.contains(event.target);
  if (!isClickInsideMenu && settingsmenu.style.display !== 'none') {
    settingsmenu.style.display = 'none';
  }
});

document.getElementById('apps').addEventListener('click', function(event) {
  var appsmenu = document.getElementById('appsmenu');
  if (appsmenu.style.display === 'none') {
    appsmenu.style.display = 'block';
  } else {
    appsmenu.style.display = 'none';
  }
  event.stopPropagation();
});

document.addEventListener('click', function(event) {
  var appsmenu = document.getElementById('appsmenu');
  var isClickInsideappsmenu = appsmenu.contains(event.target);
  if (!isClickInsideappsmenu && appsmenu.style.display !== 'none') {
    appsmenu.style.display = 'none';
  }
});

function setInputText(text) {
  document.getElementById("input").value = text;
  search();
}

function startSpeechRecognition() {
  var googleaudio = new Audio('assets/google-now-voice.mp3');
  var micImage = document.getElementById("mic-image");
  micImage.src = "https://toukle.github.io/assets/mic-on.svg";

  const recognition = new webkitSpeechRecognition();
  recognition.start();
  googleaudio.play();

  recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    if (result.trim() !== '') {
      setInputText(result);
    }
  }

  recognition.onend = function() {
    
  }
}

