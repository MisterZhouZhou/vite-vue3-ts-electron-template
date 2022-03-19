/*
 * @Author: misterzhou
 * @Date: 2022-02-28 17:28:26
 * @LastEditTime: 2022-03-18 19:02:53
 * @LastEditors: misterzhou
 * @FilePath: /vite-vue3-ts-electron-template/electron/notion.js
 * @Description: notion工具类
 */
const { Client } = require('@notionhq/client')

// 环境变量
const processEnv = require('./env.json')

// 授权
const notion = new Client({ auth: processEnv.NOTION_API_KEY })

/**
 * 根据数据库id获取数据库信息
 * @param {String} database_id 数据库id
 * @returns
 */
async function getDataBaseById(database_id) {
  return await notion.databases.retrieve({
    database_id
  })
}

/**
 * 获取多选tags
 * @returns
 */
async function getTags() {
  const database = await getDataBaseById(processEnv.NOTION_DATABASE_ID)
  const propertiesResult = getNotionProperties(database.properties)
  // get options
  const tagOptions = propertiesResult[processEnv.NOTION_TAGS_ID].multi_select.options
  // get options obj
  return tagOptions.map((option) => ({ id: option.id, name: option.name }))
}

/**
 * 从notion数据库中组合数据{ id: tags, id: title}
 * @param {Object} properties
 * @returns
 */
function getNotionProperties(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...reset } = property
    return { ...obj, [id]: reset }
  }, {})
}

/**
 * 获取notion app列表
 * @returns
 */
async function getApps() {
  // 获取所有的条目
  const pages = await notion.databases.query({
    database_id: processEnv.NOTION_DATABASE_ID
  })
  // 重组数据结构
  return pages.results.map(fromNotionObject)
}

/**
 * 将notion table item翻译为obj
 * @param {Object} page notion table item object
 * @returns
 */
function fromNotionObject(page) {
  const properties = getNotionProperties(page.properties)
  return {
    id: page.id,
    name: properties[processEnv.NOTION_NAME_ID].title[0].plain_text,
    bundle: properties[processEnv.NOTION_BUNDLE_ID].rich_text[0].text.content,
    git: properties[processEnv.NOTION_GIT_ID].url,
    version: properties[processEnv.NOTION_VERSION_ID].rich_text[0].text.content
  }
}

/**
 * 根据页面id获取页面属性
 * @param {String} pageId notion page id
 * @returns
 */
async function getSuggestionByPageId(pageId) {
  const result = await notion.pages.retrieve({ page_id: pageId })
  return fromNotionObject(result)
}

module.exports = {
  getDataBaseById,
  getTags,
  getSuggestionByPageId,
  getApps
}
