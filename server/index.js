//========================MODULES========================

const express = require('express')
const fs = require('fs')
const util = require('util')
const path = require('path')
const multer = require('multer')

//========================PROMISES========================
const writeFile = util.promisify(fs.writeFile) //convert functions into promises thanks to promisify  
const readFile = util.promisify(fs.readFile) //convert functions into promises thanks to promisify 
const unlinkFile = util.promisify(fs.unlink) //convert functions into promises thanks to promisify
const readdir = util.promisify(fs.readdir)

const app = express()

//========================MIDDLEWARES========================
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next() // end the action of the current middleware and tell to switch to the next middleware
})

app.use((req, res, next) => {
     if (req.method === 'GET') return next() // check if the request is a GET or not, go to next middleware if it's the case
     if (req.method === 'OPTIONS') return next()
     if (req.method === 'DELETE') return next()
     let accumulator = '' //accumulate all the data sent by the user in once (useful when heavy data is sent, such as videos or images) 

     req.on('data', data => {
         accumulator += data
     })

    req.on('end', () => {
        try { // check if there's an error in the data typped by the user
            req.body = JSON.parse(accumulator) //parse allows us to turn the data sent by the users (a string by default) into a Javascript object 
            next() // goes to the next middleware
        } catch (err) {
            next(err) // stops here instead of switching to the next middleware  
        }
    })
})

//========================Images upload middleware=========================
const publicImagesPath = path.join(__dirname, 'public/images') // defining the path where files will be stored 

const storage = multer.diskStorage({ //choosing to store on disk 
    destination: publicImagesPath, //specifying where the files will be stored 
    filename: (req, file, cb) => {
        cb(null, file.originalname) //keeping the original name of the file 
    }
})

const upload = multer({ storage: storage }) // upload middleware

//========================ROUTES=========================

//route to the root (nice pun !)
app.get('/', (req, res) => {

    res.send('Landing page')
})

// route to the music list
app.get('/musics', (req, res) => {
    const musicsDir = path.join(__dirname, '/mocks/musics/')
    readdir(musicsDir) // read the current folder (where index.js is located) 
        .then(files => {
            const filepaths = files.map(file => path.join(musicsDir, file)) //show the complete path leading to each mock file   
            const allFiles = filepaths.map(filepath => { // for each path generated above, read the value of the path in the UTF8 format (instead of Buffer)
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

app.post('/musics', upload.single('image'), (req, res, next) => { // calling the "upload" middleware created above and using 'single' because only one file
    const id = Math.random().toString(9).slice(2, 11).padEnd(11, '0') // generating a random ID of 11 integers
    const filename = `${id}.json` // defining the format of the searched file  
    const filepath = path.join(__dirname, '/mocks/musics/', filename)

    const content = { // structuring the object generated
        id: id,
        title: req.body.title,
        artist: req.body.artist,
        image: req.body.image,
        genre: req.body.genre,
        featuring: req.body.featuring,
        release: req.body.release,
        createdAt: Date.now()
    }
    console.log(req.file)
    writeFile(filepath, JSON.stringify(content), 'utf8')
        .then(() => res.json('OK')) // if everything's alright, response in JSON
        .catch(next) // if there's an error, go to the next middleware
})


// route to delete a music

app.delete('/musics/:id', (req, res, next) => {
    const musicsDir = path.join(__dirname, '/mocks/musics/')
    readdir(musicsDir) // read the current folder (where index.js is located) 
        .then(files => {
            console.log({ files })
            const slicedFilePath = files.map(sliced => sliced.slice(0, 11)) //slicing the path to keep the ID and remove the ".json"
            console.log({ slicedFilePath })
            const id = Number(req.params.id) // reading the id of the query string and converts it into a number 
            console.log({ id })
            for (elem of slicedFilePath) {
                if (elem == id) {
                    const elemName = elem + '.json' // defining the format of the searched file 
                    console.log({ elemName })
                    const elemPath = path.join(__dirname, '/mocks/musics/', elemName) // getting the entire path of the file to delete
                    console.log({ elemPath })

                    return unlinkFile(elemPath) // comparing and returning the index of the first ID corresponding to the one in the query string of the page
                }
            }
        })
        .then(() => res.send('DELETED'))
        .catch(next)
})



// route to the detailed music selected 

app.get('/musics/:id', (req, res) => {
    const filename = `${req.params.id}.json` // getting the name of the file, allowed to the id typped b the user 
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