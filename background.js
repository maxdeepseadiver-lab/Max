// Opera GX Background Music Mod - Service Worker
// YouTube Video: https://www.youtube.com/watch?v=dKqAL4mZjHA

let audioPlayer = null;
let isPlaying = false;
let currentVolume = 0.5;

// Audio stream URL (using invidious or alternative method)
const YOUTUBE_VIDEO_ID = "dKqAL4mZjHA";
const AUDIO_STREAM_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    musicEnabled: true,
    volume: 0.5,
    isPlaying: false
  });
  initializeMusicPlayer();
});

// Initialize music player
function initializeMusicPlayer() {
  chrome.storage.local.get(['musicEnabled', 'volume', 'isPlaying'], (result) => {
    if (result.musicEnabled && result.isPlaying) {
      startBackgroundMusic();
    }
  });
}

// Start background music
function startBackgroundMusic() {
  if (!audioPlayer) {
    audioPlayer = new Audio();
    audioPlayer.loop = true;
    audioPlayer.volume = currentVolume;
  }

  // Use youtube-nocookie or invidious for audio extraction
  const invidious = "https://invidious.io/api/v1/videos/" + YOUTUBE_VIDEO_ID + "?fields=formatStreams";
  
  // Fallback: Use a direct audio service
  const audioUrl = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
  
  // Set crossOrigin for CORS support
  audioPlayer.crossOrigin = "anonymous";
  audioPlayer.src = audioUrl;
  
  audioPlayer.play().then(() => {
    isPlaying = true;
    chrome.storage.local.set({ isPlaying: true });
    chrome.runtime.sendMessage({ action: 'updateStatus', playing: true }).catch(() => {});
  }).catch((error) => {
    console.error("Error playing audio:", error);
    // Try alternative streaming method
    playViaYouTubeProxy();
  });
}

// Alternative method using YouTube proxy
function playViaYouTubeProxy() {
  // Using youtube-nocookie embed as fallback
  const proxyUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;
  
  audioPlayer = new Audio();
  audioPlayer.loop = true;
  audioPlayer.volume = currentVolume;
  
  // Create audio context for proxy
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Fallback to local storage of audio if available
  chrome.storage.local.get('audioData', (result) => {
    if (result.audioData) {
      audioPlayer.src = result.audioData;
      audioPlayer.play();
      isPlaying = true;
      chrome.storage.local.set({ isPlaying: true });
    }
  });
}

// Stop background music
function stopBackgroundMusic() {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    chrome.storage.local.set({ isPlaying: false });
  }
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'toggleMusic':
      if (isPlaying) {
        stopBackgroundMusic();
      } else {
        startBackgroundMusic();
      }
      sendResponse({ playing: isPlaying });
      break;
      
    case 'setVolume':
      currentVolume = request.volume;
      if (audioPlayer) {
        audioPlayer.volume = currentVolume;
      }
      chrome.storage.local.set({ volume: currentVolume });
      sendResponse({ volume: currentVolume });
      break;
      
    case 'getStatus':
      sendResponse({ 
        playing: isPlaying, 
        volume: currentVolume,
        videoId: YOUTUBE_VIDEO_ID
      });
      break;
      
    case 'startMusic':
      startBackgroundMusic();
      sendResponse({ started: true });
      break;
      
    case 'stopMusic':
      stopBackgroundMusic();
      sendResponse({ stopped: true });
      break;
  }
});

// Keep service worker alive (Opera GX specific)
setInterval(() => {
  if (isPlaying && audioPlayer) {
    // Check if audio is still playing
    if (audioPlayer.paused) {
      audioPlayer.play().catch(() => {});
    }
  }
}, 5000);
