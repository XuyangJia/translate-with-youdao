const fs = require('fs')
const Excel = require('exceljs')
const translateLib = require('../lib/youdao')
// console.log(translateLib)
// translateLib.translateWithJson({ '48006': '紫色兵力星辰',
// '48007': '绿色防御星辰' })
const workbook = new Excel.Workbook()
const sheet = workbook.addWorksheet('test')
sheet.columns = [
  { header: 'ID', key: 'id', width: 50 },
  { header: '中文', key: 'zh', width: 1000 },
  { header: '英文', key: 'en', width: 1500 }
]
const data = [{
  id: '787818992109210',
  zh: '深圳市',
  en: '11111111111'
}]
sheet.addRows(data)
workbook.xlsx.writeFile('翻译.xlsx')
