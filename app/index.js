const fse = require('fs-extra')
const path = require('path')
const translateLib = require('../lib/youdao')
const Excel = require('exceljs')
const fp = path.resolve(__dirname, '../data.json')
const data = fse.readJSONSync(fp, { throws: false })
const result = {}

async function singleTranslate (id) {
  const zh = data[id]
  console.log(zh)
  const en = await translateLib.translate2En(zh)
  console.log(en)
  return { zh, en }
}

async function translate () {
  Object.keys(data).forEach(async (key) => {
    result[key] = await singleTranslate(key)
  })
}

translate()

// const workbook = new Excel.stream.xlsx.WorkbookWriter({
//   filename: './translate.xlsx'
// })
// const worksheet = workbook.addWorksheet('Sheet')
// worksheet.columns = [
//   { header: 'ID', key: 'id', width: 20 },
//   { header: '中文', key: 'zh', width: 50 },
//   { header: '英文', key: 'en', width: 50 }
// ]
// const data = [{
//   id: '787818992109210',
//   zh: '深圳市',
//   en: '11111111111'
// }]
// data.forEach(value => {
//   worksheet.addRow(value).commit()
// })
// workbook.commit()
