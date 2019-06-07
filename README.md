## 第一步 安装electron
创建create-react-app项目：
create-react-app app
(或者 npx create-react-app app)

cd app

安装electron：
npm install electron --save
npm install --save-dev electron-builder

安装foreman:
npm install foreman --save-dev

修改package.json中的scripts:
  "scripts": {
    "start": "nf start -p 3000",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron .",
    "electron-start": "node src/start-react",
    "react-start": "BROWSER=none react-scripts start",
    "pack": "build --dir",
    "dist": "npm run build && build",
    "postinstall": "install-app-deps"
  },

并添加：
  "homepage": "./",
  "main": "src/electron-starter.js",
  "build": {
    "appId": "com.electron.electron-with-create-react-app",
    "win": {
      "iconUrl": "https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-256.png"
    },
    "directories": {
      "buildResources": "public"
    }
  }

在项目根目录下添加Procfile文件：
react: npm run react-start
electron: npm run electron-start

在项目的src/目录下添加electron-starter.js文件：
```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1050, height: 700, titleBarStyle: 'hidden' })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
  )

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
```

在src下再添加start-react.js文件：
```javascript
const net = require('net')
const childProcess = require('child_process')

const port = process.env.PORT ? process.env.PORT - 100 : 3000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let startedElectron = false
const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedElectron) {
        console.log('starting electron')
        startedElectron = true
        const exec = childProcess.exec
        exec('npm run electron')
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  setTimeout(tryConnection, 1000)
})
```

到这里启动它是没有问题了

## 第二步 安装antd
cnpm install --save antd

到这里其实正常的使用antd是没有问题的，不过考虑到性能问题，需要进行按需加载的配置
cnpm install --save react-app-rewired customize-cra babel-plugin-import

将package.json中的scripts改为：
  "scripts": {
    "start": "nf start -p 3000",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron .",
    "electron-start": "node src/start-react",
    "react-start": "BROWSER=none react-app-rewired start",
    "pack": "build --dir",
    "dist": "npm run build && build",
    "postinstall": "install-app-deps"
  },

然后在项目根目录创建一个 config-overrides.js 用于修改默认配置：
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);

## 第三步 启动
npm run electron 只启动桌面程序

npm start 启动web端以及桌面程序
