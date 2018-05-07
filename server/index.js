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

//route to the root (nice pun)
app.get('/', (req, res) => {
 
  res.send('OK')
})

// route to the music list
app.get('/musics', (req, res) => {
 
  res.json(musics)
})
// route to the detailed music selected 

app.get('/musics/:id', (req, res) => {
  const id = Number(req.params.id) //get the music ID via the params method from the request (converted in number because is a string by default)  
  const music = musics.find(music => music.id === id) // search the music ID and compared it with ID's the array "musics" to find the right one
  console.log(id, music)
  res.json(music) // if the corresponding ID is found in the array, display the right music
})

app.listen(8080, () => console.log('server init'))
