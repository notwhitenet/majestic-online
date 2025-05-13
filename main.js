const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 700,
        height: 700,
        resizable: false,
        fullscreenable: false,
        darkTheme: true,
        icon: path.join(__dirname, 'web', 'favicom.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('web/main.html');

    Menu.setApplicationMenu(null);

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('window-id', win.id);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('minimize-window', (event, windowId) => {
    const window = BrowserWindow.fromId(windowId);
    if (window) {
        window.minimize();
    }
});

ipcMain.on('close-window', (event, windowId) => {
    const window = BrowserWindow.fromId(windowId);
    if (window) {
        window.close();
    }
});
