const net = require('net')
const childProcess = require('child_process')
const io = require('socket.io-client')
const PATH = 'http://127.0.0.1:8080/';
const socket = io.connect(PATH);

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
        connectServer();
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

const connectServer = () => {
  socket.on('connect', () => {
    console.log(`[SUCCESS]-connect to server`);
  });
}

socket.on('disconnect', () => {
  socket.open();
});
