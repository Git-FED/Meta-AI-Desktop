const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('metaDesktop', {
  launchApp: () => ipcRenderer.invoke('open-appetize'),
  openDoc: (filename) => ipcRenderer.invoke('open-docs', filename)
});
