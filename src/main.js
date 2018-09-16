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
    minHeight: 600,
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
      label: "Electron",
      submenu: []
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Chromium Developer Tools',
          accelerator: 'Alt+' + commandOrCtrl() + '+I',
          click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
        },
        {
          label: 'Page Reload',
          accelerator: 'CmdOrCtrl+R' + commandOrCtrl() + '+R',
          click: function() { BrowserWindow.getFocusedWindow().reload(); }
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
