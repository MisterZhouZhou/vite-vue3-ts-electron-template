"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const electron_1 = require("electron");
const mainWindow_1 = require("./mainWindow");
const handleIPC_1 = require("./handleIPC");
electron_1.app.whenReady().then(() => {
    // 创建window
    (0, mainWindow_1.createWindow)();
    // 处理消息
    (0, handleIPC_1.handleIPC)();
    // 监听app激活
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            (0, mainWindow_1.createWindow)();
        }
    });
});
// 监听所有窗口关闭
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// 忽略警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
