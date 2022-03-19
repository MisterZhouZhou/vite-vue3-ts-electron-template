"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIPC = void 0;
const electron_1 = require("electron");
const notion_1 = require("./notion");
const handleIPC = () => {
    // 获取APP信息
    electron_1.ipcMain.handle('notion-apps', async () => {
        // 获取APP列表
        const result = await (0, notion_1.getApps)();
        return result;
    });
};
exports.handleIPC = handleIPC;
