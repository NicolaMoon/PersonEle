const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  // 配置窗口
  const options = {
    width: 1050,
    height: 700,
    titleBarStyle: 'hidden',
  }

  // window操作系统适配，窗口设置
  if (process.platform === 'win32') {
    options.width = 850
    options.height = 520
    options.frame = false
  }
  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
  )

  // 开启调试工具
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})