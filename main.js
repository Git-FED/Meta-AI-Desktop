const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

const PLAY_URL = 'https://appetize.io/app/b_vmsfd6j2qw2ffdla37n7taxgdq';
let homeWindow;
let playWindow;

function createHomeWindow() {
  homeWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 980,
    minHeight: 700,
    backgroundColor: '#07080d',
    title: 'Meta AI Desktop',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  homeWindow.loadFile('index.html');
  homeWindow.on('closed', () => { homeWindow = null; });
}

function openPlayWindow() {
  if (playWindow && !playWindow.isDestroyed()) {
    playWindow.focus();
    return;
  }

  playWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 900,
    minHeight: 640,
    backgroundColor: '#0b0c12',
    title: 'Meta AI — Appetize Session',
    autoHideMenuBar: true,
    webPreferences: {
      session: session.fromPartition('persist:meta-ai-appetize'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  });

  playWindow.loadURL(PLAY_URL);
  playWindow.on('closed', () => { playWindow = null; });
}

app.whenReady().then(() => {
  createHomeWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createHomeWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('web-contents-created', (_event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
});

// IPC is deliberately minimal: the shell can request one controlled action.
const { ipcMain } = require('electron');
ipcMain.handle('open-appetize', () => {
  openPlayWindow();
  return { url: PLAY_URL };
});

ipcMain.handle('open-docs', (_event, filename) => {
  const allowed = new Set(['CHAT-DETAILS.md', 'APPETIZE-FREE-LIMITS.md', 'OWN-CLONE-RESEARCH.md']);
  if (!allowed.has(filename)) return false;
  shell.openPath(path.join(__dirname, 'docs', filename));
  return true;
});
