const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
require('electron-debug')({showDevTools: true});

let win;
function createWindow () {
  win = new BrowserWindow({
    show: true,
    width: 1080,
    height: 680,
    minWidth: 900,
    minHeight: 500,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../public/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // デバッグツールはデフォルトOFF.
  //win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
