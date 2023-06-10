var newTabOpened = false;
var timer;

function search() {
  var searchInput = document.getElementById("input").value;
  
  if (searchInput.trim() === "") {
    return;
  }
  
  var searchURL = "https://www.google.com/search?q=" + encodeURIComponent(searchInput);
  openInNewTab(searchURL);
  
  // Start de timer van 0,5 seconden
  timer = setTimeout(function() {
    if (!newTabOpened) {
      replaceTab(searchURL);
    }
  }, 500);
}

function openInNewTab(url) {
  newTabOpened = true; // Markeer dat er een nieuw tabblad is geopend
  var newTab = window.open(url, "_blank");
  newTab.focus();
}

function replaceTab(url) {
  clearTimeout(timer);
  window.location.replace(url);
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
  search(); // Voer de zoekfunctie uit
}

function startSpeechRecognition() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'nl-NL';
  recognition.start();

  recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    if (result.trim() !== '') {
      setInputText(result);
    }
  }
}