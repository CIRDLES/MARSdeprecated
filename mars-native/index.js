'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1366, height: 768});

  if(process.env.WATCH) {
    mainWindow.loadURL('http://localhost:8080/index.html');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/node_modules/mars-client/dist/index.html');
  }

  if(process.env.DEV) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
