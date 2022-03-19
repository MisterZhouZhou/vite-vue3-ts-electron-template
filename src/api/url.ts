/*
 * @Author: misterzhou
 * @Date: 2022-03-05 13:32:02
 * @LastEditTime: 2022-03-17 17:35:39
 * @LastEditors: misterzhou
 * @FilePath: /mz-jarvis-bundle/src/api/url.ts
 * @Description:
 */
import { URL } from '@/config/config'

export default {
  // get 随机音乐
  randomMusic: `${URL.musicUrl}/rand.music?sort=热歌榜&format=json`,
}
