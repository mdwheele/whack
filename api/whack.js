const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, World!'
  })
})

app.listen(3000, () => {
  console.log('Listening on 3000...')
})