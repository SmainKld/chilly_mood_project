//========================MODULES========================

const express = require('express')
const music1 = require('./mocks/musics/music-1.json')
const music2 = require('./mocks/musics/music-2.json')
const music3 = require('./mocks/musics/music-3.json')

const musics = [
  music1, 
  music2,
  music3
]

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


//========================ROUTES=========================

app.get('/', (req, res) => {
 
  res.send('OK')
})

app.get('/musics', (req, res) => {
 
  res.json(musics)
})

app.listen(8080, () => console.log('server init'))
