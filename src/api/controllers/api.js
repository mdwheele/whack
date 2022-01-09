const fs = require('fs')
const path = require('path')

exports.specification = async (req, res) => {
  res.header('Content-Type', 'text/plain').send(
    fs.readFileSync(path.resolve(__dirname, '../../../openapi.yaml'))
  )
}