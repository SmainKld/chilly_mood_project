import {displayMusics} from './components/displayMusics.js'

fetch('http://localhost:8080/musics') //fetching the route /musics, which contains music mocks in JSON format
  .then(response => response.json())  // turning and displaying musics mocks in JSON
  .then(musics => {
    const musicsElement = document.getElementById('musics') //selecting the ID 'musics', defined in a DIV in index.html
    const musicElements = musics.map(displayMusics).join('') // returning an array of the music mocks and displayed thanks to the function 'displayMusics'. 

    musicsElement.innerHTML = musicElements // selecting 'musics' ID and inject through HTML the display of musics 
    console.log(musicElements) // testing 
    })