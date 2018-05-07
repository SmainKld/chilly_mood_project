//========================MODULES========================

const express = require('express')
const fs = require('fs')
const path = require('path')


// const music1 = require('./mocks/musics/music-1.json')
// const music2 = require('./mocks/musics/music-2.json')
// const music3 = require('./mocks/musics/music-3.json')

// const musics = [
//   music1, 
//   music2,
//   music3
// ]

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
 const filename = `music-${req.params.id}.json` // getting the name of the file, allowed to the id typped b the user 
 const filepath = path.join(__dirname, '/mocks/musics/', filename) // joining __dirname (which is the path to the current folder : /home/smain/Bureau/chilly_mood_project/server) with the filename

 fs.readFile(filepath, (err, data) => { //method used to read a file, use the filepath created above
  if(err) {
    return res.status(404).end('music not found') // Important : beware about handling the error case
  }
  res.header('Content-Type', 'application/json; charset=utf-8') //converting the data (currently at Buffer format) into JSON
  console.log(data)
  res.end(data)
  })
})

app.listen(8080, () => console.log('8080 in da place *w*'))



