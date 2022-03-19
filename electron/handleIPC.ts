import { ipcMain } from 'electron'
import { getApps } from './notion'

export const handleIPC = () => {
  // 获取APP信息
  ipcMain.handle('notion-apps', async () => {
    // 获取APP列表
    const result = await getApps()
    return result
  })
}
