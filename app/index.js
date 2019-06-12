const fse = require('fs-extra')
const path = require('path')
const translateLib = require('../lib/youdao')
const Excel = require('exceljs')
const fp = path.resolve(__dirname, '../data.json')
const data = fse.readJSONSync(fp, { throws: false })
const result = {}

async function singleTranslate (id) {
  const zh = data[id]
  const en = await translateLib.translate2En(zh)
  result[id] = { zh, en }
  console.log(zh, en)
}

async function translate () {
  // await Promise.all(Object.keys(data).forEach(async (key) => {
  //   await singleTranslate(key)
  // }))
  for (let key in data) {
    // await singleTranslate(key)
    console.log(key)
  }
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
