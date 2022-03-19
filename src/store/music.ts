/*
 * @Author: misterzhou
 * @Date: 2022-03-05 13:34:06
 * @LastEditTime: 2022-03-05 13:41:32
 * @LastEditors: misterzhou
 * @FilePath: /mz-music/src/store/music.ts
 * @Description: store
 */
import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music', {
  state: () => {
    return { refreshNum: 0 }
  },
  getters: {
    queryRefresh(state) {
      return state.refreshNum
    }
  },
  actions: {
    upRefresh(num: number) {
      this.refreshNum = num
    }
  }
})
