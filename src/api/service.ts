/*
 * @Author: misterzhou
 * @Date: 2022-03-05 13:30:48
 * @LastEditTime: 2022-03-18 12:22:27
 * @LastEditors: misterzhou
 * @FilePath: /mz-jarvis-bundle/src/api/service.ts
 * @Description:
 */
import request from '@/utils/request'
import URLS from './url'

const urlHost = import.meta.env.VITE_BUNDLE_HISTORY_URL

interface ResponseIns {
  code: number
  data: object
  msg: string // 提示信息
}

// 获取随机音乐信息
export const fetchRandMusic = () => {
  return request.get(URLS.randomMusic)
}

// 获取列表
export const getHistoryBundleList = async (bundleName: string, env: string) => {
  const res: ResponseIns = await request.get(`${urlHost}/${env}/${bundleName}/1/100`)
  const { code, data, msg } = res
  if (code !== 10000) {
    console.warn('$-请求失败：', msg)
    return null
  }
  return data
}
