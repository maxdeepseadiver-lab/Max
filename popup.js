// Popup Script - UI Controller

let isPlaying = false;

// DOM Elements
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const statusText = document.getElementById('statusText');
const autoPlayCheckbox = document.getElementById('autoPlayCheckbox');
const loopCheckbox = document.getElementById('loopCheckbox');

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  updateStatus();
});

// Load settings from storage
function loadSettings() {
  chrome.storage.local.get(['musicEnabled', 'volume', 'isPlaying', 'autoPlay', 'loop'], (result) => {
    if (result.volume !== undefined) {
      volumeSlider.value = result.volume * 100;
      updateVolumeDisplay(result.volume * 100);
    }
    if (result.autoPlay !== undefined) {
      autoPlayCheckbox.checked = result.autoPlay;
    }
    if (result.loop !== undefined) {
      loopCheckbox.checked = result.loop;
    }
  });
}

// Update player status
function updateStatus() {
  chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
    if (response) {
      isPlaying = response.playing;
      updateButtonUI();
      updateStatusText();
    }
  });
}

// Update button UI based on playing state
function updateButtonUI() {
  if (isPlaying) {
    playPauseBtn.classList.add('playing');
    playPauseBtn.innerHTML = '<span class="icon">⏸</span><span class="text">Pause</span>';
    statusText.textContent = '🎵 Now Playing...';
    statusText.style.color = '#00d084';
  } else {
    playPauseBtn.classList.remove('playing');
    playPauseBtn.innerHTML = '<span class="icon">▶</span><span class="text">Play</span>';
    statusText.textContent = '⏸ Paused';
    statusText.style.color = '#ccc';
  }
}

// Update status text
function updateStatusText() {
  if (isPlaying) {
    statusText.textContent = '🎵 Now Playing: Passbeck - Pokemon Schwert';
  }
}

// Play/Pause button click
playPauseBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'toggleMusic' }, (response) => {
    isPlaying = response.playing;
    updateButtonUI();
  });
});

// Stop button click
stopBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopMusic' }, (response) => {
    if (response.stopped) {
      isPlaying = false;
      updateButtonUI();
    }
  });
});

// Volume slider change
volumeSlider.addEventListener('input', (e) => {
  const volumePercent = e.target.value;
  const volumeDecimal = volumePercent / 100;
  
  chrome.runtime.sendMessage(
    { action: 'setVolume', volume: volumeDecimal },
    (response) => {
      updateVolumeDisplay(volumePercent);
    }
  );
});

// Update volume display
function updateVolumeDisplay(value) {
  volumeValue.textContent = Math.round(value) + '%';
}

// Auto-play checkbox
autoPlayCheckbox.addEventListener('change', (e) => {
  chrome.storage.local.set({ autoPlay: e.target.checked });
});

// Loop checkbox
loopCheckbox.addEventListener('change', (e) => {
  chrome.storage.local.set({ loop: e.target.checked });
});

// Update status periodically
setInterval(updateStatus, 2000);
