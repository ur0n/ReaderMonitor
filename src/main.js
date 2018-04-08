const { app, BrowserWindow, Menu } = require('electron');
const path = require('path')
const url = require('url')

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

const isWindows = () => {
  return process.platform === 'win32';
}

const isLinux = () => {
  return process.platform === 'linux';
}

const commandOrCtrl = () => {
  return (isWindows() || isLinux()) ? 'Ctrl' : 'Command';
}

function initialMenu() {
  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Chromium Developer Tools',
          accelerator: 'Alt+' + commandOrCtrl() + '+I',
          click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', () => {
  createWindow();
  initialMenu();
})
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
