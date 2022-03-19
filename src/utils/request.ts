/*
 * @Author: misterzhou
 * @Date: 2022-03-05 13:26:07
 * @LastEditTime: 2022-03-17 17:50:41
 * @LastEditors: misterzhou
 * @FilePath: /mz-jarvis-bundle/src/utils/request.ts
 * @Description: axios 请求封装
 */
import axios from 'axios'
import { CT } from '@/config/config'

// 创建 axios 实例
const request = axios.create({
  timeout: CT.timeout // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  if (error.response) {
    const data = error.response.data
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  // 自定义全局header
  config.headers = config.headers ? config.headers : {}
  config.headers['Content-Type'] = 'application/json'
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const { status, data } = response
  if (status === 200 && data) {
    return data
  }
  return Promise.reject(data)
}, errorHandler)

export default request
