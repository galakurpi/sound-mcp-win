import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory in a way that works for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the completion.mp3 file in the sounds directory
const COMPLETION_SOUND = path.resolve(__dirname, '..', 'sounds', 'completion.mp3');

// Function to play audio silently in the background using PowerShell and Windows Media Player
function playAudioInBackground(audioFilePath: string): Promise<string> {
  const resolvedPath = path.resolve(audioFilePath);
  // Simple PowerShell command to play audio
  const powershellCommand = `
    Add-Type -AssemblyName presentationCore;
    $ErrorActionPreference = 'SilentlyContinue';
    $player = New-Object System.Windows.Media.MediaPlayer;
    $player.Open('${resolvedPath.replace(/\\/g, '\\\\')}');
    $player.Play();
    Start-Sleep -Seconds 2;
    $player.Close();
  `.replace(/\n\s*/g, ' ').trim();

  const command = `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -WindowStyle Hidden -NoProfile -NonInteractive -NoLogo -Command "${powershellCommand}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to play audio: ${error.message}`));
        return;
      }
      if (stderr) {
        reject(new Error(`Error during playback: ${stderr}`));
        return;
      }
      resolve('Audio playback completed successfully');
    });
  });
}

async function main() {
  const server = new McpServer({
    name: 'CursorSoundMCPWin',
    version: '1.0.0'
  });

  // Tool to play sound after code generation
  server.tool(
    'playCompletionSound',
    {},
    async () => {
      try {
        // Play the completion sound silently
        await playAudioInBackground(COMPLETION_SOUND);
        return {
          content: [{ type: 'text', text: 'Played completion sound' }]
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Failed to play sound: ${errorMessage}` }]
        };
      }
    }
  );

  // Start the server using stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('Cursor Sound MCP server started...');
}

main().catch(error => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});