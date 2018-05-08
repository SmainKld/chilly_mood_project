//========================MODULES========================

const express = require('express')
const fs = require('fs')
const util = require ('util')
const path = require('path')


const readFile = util.promisify(fs.readFile) //convert functions into promises thanks to promisify  
const readdir = util.promisify(fs.readdir)

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
  const musicsDir = path.join(__dirname, '/mocks/musics/') 
  readdir(musicsDir) // read the current folder (where index.js is located) 
  .then (files => {
    const filepaths = files.map(file => path.join(musicsDir, file)) //show the complete path leading to each mock file   
    const allFiles = filepaths.map(filepath => {  // for each path generated above, read the value of the path in the UTF8 format (instead of Buffer)
      return readFile(filepath, 'utf8')
    })

  Promise.all(allFiles) //takes the array of promises generated above and converts it into an array the promises' values
  .then(allFilesValues => {
    const valuesInJson = allFilesValues.map(JSON.parse)
    res.json(valuesInJson)
  })
  .catch(err => {
    res.status(500).end(err.message)
    })  
  })
})


// route to the detailed music selected 

app.get('/musics/:id', (req, res) => {
 const filename = `music-${req.params.id}.json` // getting the name of the file, allowed to the id typped b the user 
 const filepath = path.join(__dirname, '/mocks/musics/', filename) // joining __dirname (which is the path to the current folder : /home/smain/Bureau/chilly_mood_project/server) with the filename

 readFile(filepath) //method used to read a file, use the filepath created above
  .then(data => {
    res.header('Content-Type', 'application/json; charset=utf-8') //converting the data (currently at Buffer format) into JSON
    res.end(data)    
  })

  .catch(err => {
    return res.status(404).end('music not found') // Important : beware about handling the error case
  })
})

app.listen(8080, () => console.log('8080 in da place *w*'))