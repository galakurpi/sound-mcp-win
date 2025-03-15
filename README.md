# 🔊 Cursor Sound MCP

Get audio feedback when Cursor AI completes generating code! This simple tool plays a satisfying sound effect whenever Cursor finishes its work, making your coding experience more interactive and enjoyable.

Demo: 

## 🚀 Quick Start

1. **Install Node.js:**
   - Download and install from [nodejs.org](https://nodejs.org/)
   - We recommend the LTS (Long Term Support) version

2. **Clone this repository:**
   ```bash
   git clone https://github.com/galakurpi/sound-mcp-win.git
   cd sound-mcp
   ```

3. **Install project dependencies:**
   ```bash
   npm install
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Add this command to Cursor MCP settings:**
   ```cmd
   node [ROOT DIR OF CLONED REPO]\dist\index.js
   ```

That's it! Now when Cursor AI completes code generation, you'll hear a sound effect! 🎵

## 🎵 Customizing Sounds

Want to use your own sound effects? It's easy:

1. Find an MP3 sound you like (try [freesound.org](https://freesound.org))
2. Name it `completion.mp3`
3. Place it in the `sounds` folder
4. Restart the server

## 🛠️ Development

If you're making changes to the code:

```bash
npm run dev
```

This will automatically rebuild the project when you make changes.

## 📝 Requirements

- Windows 10 or later
- Node.js 16 or later
- PowerShell (comes with Windows)

## ❓ Troubleshooting

- **No sound playing?** Make sure:
  - Your system volume is on
  - The `sounds/completion.mp3` file exists
  - You have PowerShell available (try running `powershell` in cmd)

- **Error messages?** Try:
  - Running `npm install` again
  - Deleting the `dist` folder and running `npm run build`
  - Checking if you have Node.js installed correctly

## 🤝 Contributing

Found a bug or want to improve something? Talk to me on Twitter!