//========================MODULES========================

const express = require('express')

const app = express()

//========================ROUTES=========================

app.get('/', (req, res) => {
  res.send('OK')
})

app.listen(8080, () => console.log('server init'))