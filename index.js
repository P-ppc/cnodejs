const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 400,
        height: 725,
        title: 'CNODE',
        resizable: false
    });

    // win.loadURL(`file://${__dirname}/app/login.html`);
    win.loadURL(`file://${__dirname}/app/init.html`);

    win.on("closed", () => {
        win = null;
    }); 

    ipc.on("login-success", () => {
        console.log("login success");
        win.setSize(600, 780, true);
        // win.loadURL(`file://${__dirname}/app/index.html`);
        // win.loadURL(`file://${__dirname}/app/login.html`);
    });
}

app.on("ready", createWindow);