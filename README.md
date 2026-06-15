# Opera GX Background Music Mod 🎮🎵

A custom Opera GX browser extension that plays the **Passbeck Pokemon Schwert Soundtrack** as continuous background music while you browse.

**YouTube Video:** https://www.youtube.com/watch?v=dKqAL4mZjHA

## Features

✨ **Continuous Background Music** - Plays looping audio while browsing  
🎚️ **Volume Control** - Adjust volume from 0-100%  
⏸️ **Play/Pause Controls** - Easy start/stop functionality  
🔄 **Auto-play Option** - Start music automatically on browser launch  
🎨 **Opera GX Themed UI** - Dark theme with GX green accents  
📊 **Lightweight** - Minimal resource usage  

## Installation

### Method 1: Manual Installation (Developer Mode)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/maxdeepseadiver-lab/Max.git
   cd Max
   ```

2. **Open Opera GX Extensions Page**
   - Press `Ctrl+Shift+M` (Windows/Linux) or `Cmd+Shift+M` (Mac)
   - Or go to: `opera://extensions/`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right

4. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Select the cloned repository folder
   - The extension will appear in your extensions list

5. **Pin to Sidebar**
   - Click the extension icon in the toolbar
   - Pin it to your sidebar for quick access

### Method 2: Direct Installation (Future)

Once packaged, this extension can be submitted to the Opera Addons store.

## Usage

### Opening the Music Player
- **Click the music icon** in your Opera GX sidebar/toolbar
- A popup window will open with player controls

### Controls

| Button | Function |
|--------|----------|
| ▶ Play | Start playing background music |
| ⏸ Pause | Pause the current playback |
| ⏹ Stop | Stop and reset playback |
| 🔊 Volume Slider | Adjust volume 0-100% |

### Settings

- **Auto-play on browser start** - Music automatically plays when Opera GX opens
- **Loop continuously** - Music repeats endlessly (recommended enabled)
- **YouTube Link** - Quick access to the source video

## File Structure

```
Max/
├── manifest.json      # Extension configuration
├── background.js      # Service worker (music player logic)
├── popup.html         # UI layout
├── popup.js           # UI controller
├── popup.css          # Styling (Opera GX theme)
├── README.md          # This file
└── icons/             # Extension icons (optional)
```

## Technical Details

### How It Works

1. **Service Worker** (`background.js`)
   - Manages audio playback
   - Handles volume control
   - Maintains playback state across browser sessions
   - Keeps music looping

2. **Popup UI** (`popup.html`, `popup.js`, `popup.css`)
   - User-friendly control panel
   - Real-time status display
   - Settings management

3. **Storage**
   - Saves user preferences (volume, auto-play, loop settings)
   - Persists playback state

### Audio Source

The extension currently streams from: `https://www.youtube.com/watch?v=dKqAL4mZjHA`

**Note:** Due to YouTube CORS restrictions, direct streaming may require:
- Alternative audio services
- Local audio file support (future update)
- Proxy services for audio extraction

## Troubleshooting

### Audio Not Playing
1. Check browser volume settings
2. Verify extension permissions
3. Reload the extension (toggle on/off in extensions menu)
4. Check browser console for errors (F12 → Console)

### High CPU/Memory Usage
1. Adjust volume to reduce processing
2. Disable auto-play if not needed
3. Restart the browser

### YouTube Link Not Working
1. The extension uses various audio streaming methods
2. If YouTube API blocks access, alternative methods are:
   - Download audio locally and add to extension
   - Use Invidious or alternative YouTube frontends
   - Use direct audio file hosting

## Future Enhancements

- 🎵 Playlist support (multiple background tracks)
- 🎨 Custom theme/color options
- 📊 Mini player widget on new tabs
- 🔔 Notification on autoplay start
- 🌐 Support for other audio sources
- 🎚️ Equalizer controls
- 🔐 Local audio file support

## Legal Notice

This extension is created for personal use with Opera GX. The included YouTube video is the property of its original creator (Passbeck). Ensure you have the right to use this content according to YouTube's ToS and local laws.

## Support

For issues or suggestions:
1. Check the GitHub Issues page
2. Review troubleshooting section
3. Create a new issue with details

## License

This project is open-source. Feel free to modify and share!

---

**Made for Opera GX 🎮**  
*Enjoy your Pokemon Schwert soundtrack while browsing!*
