const YML = require('yamljs')
const fs = require('fs')
const path = require('path')

let ls = []

const yamlPath = path.resolve(__dirname, 'source/_data/links.yml')
const yamlText = fs.readFileSync(yamlPath, 'utf8').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n')
const parsed = YML.parse(yamlText) || {}

// 顶层为对象，友链分组在 links 下
const groups = Array.isArray(parsed) ? parsed : (parsed.links || [])

groups.forEach((group, index) => {
  const limit = 2 // 获取前两个分组
  if (index < limit && Array.isArray(group.link_list)) {
    ls = ls.concat(group.link_list)
  }
})

const outPath = path.resolve(__dirname, 'source/flink_count.json')
fs.writeFileSync(outPath, `{"link_list": ${JSON.stringify(ls)},"length":${ls.length}}`)
console.log('flink_count.json 文件已生成。');
