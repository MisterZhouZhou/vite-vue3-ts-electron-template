"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
// 路径
const pathResolve = (dir) => (0, path_1.resolve)(__dirname, dir);
// 是否为开发环境
const isDev = process.env.IS_DEV == 'true' ? true : false;
let _mainWindow;
function createWindow() {
    _mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 930,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: pathResolve('preload.js')
        }
    });
    if (isDev) {
        const port = process.env.PORT || 3000;
        // 加载本地服务
        _mainWindow.loadURL(`http://localhost:${port}`);
        // 打开开发者工具
        _mainWindow.webContents.openDevTools();
    }
    else {
        // 加载生成环境路径
        _mainWindow.loadFile(pathResolve('../dist/index.html'));
    }
}
exports.createWindow = createWindow;
