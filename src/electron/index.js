const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
require("update-electron-app")({
  repo: "NicolaMoon/PersonEle",
  updateInterval: "1 hour"
});
const eventInitial = require('./event.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  // 配置窗口
  const options = {
    width: 1050,
    height: 700,
    titleBarStyle: 'hidden',
  }

  // window操作系统适配，窗口设置
  if (process.platform === 'win32') {
    options.width = 800;
    options.height = 520;
    options.frame = false;
  }
  mainWindow = new BrowserWindow(options);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // 开启调试工具
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

eventInitial();
