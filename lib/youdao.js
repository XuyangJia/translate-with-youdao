const request = require('request')
const crypto = require('crypto')
function getInput (input) {
  if (input.length === 0) {
    return null
  }
  var result
  var len = input.length
  if (len <= 20) {
    result = input
  } else {
    var startStr = input.substring(0, 10)
    var endStr = input.substring(len - 10, len)
    result = startStr + len + endStr
  }
  return result
}
const appKey = '5c20aac72ca14f01'
const key = 'knKpX4kyPsDdSao7HI2kBn8TNZUEVwFO'

function translate2En (query) {
  const salt = Date.now()
  const curtime = Math.round(salt / 1000)
  const hash = crypto.createHash('sha256')
  const sign = hash.update(appKey + getInput(query) + salt + curtime + key).digest('hex')

  return new Promise((resolve, reject) => {
    request.post({ url: 'http://openapi.youdao.com/api',
      form: {
        q: query,
        appKey,
        salt,
        from: 'zh-CHS',
        to: 'en',
        curtime,
        sign,
        signType: 'v3'
      } }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        let { translation } = JSON.parse(res.body)
        translation || (translation = [''])
        resolve(translation[0])
      }
    })
  })
}

module.exports = { translate2En }
