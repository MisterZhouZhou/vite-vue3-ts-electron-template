require('dotenv').config()
import { app, BrowserWindow } from 'electron'
import { createWindow } from './mainWindow'
import { handleIPC } from './handleIPC'

app.whenReady().then(() => {
  // 创建window
  createWindow()
  // 处理消息
  handleIPC()

  // 监听app激活
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 监听所有窗口关闭
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 忽略警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
