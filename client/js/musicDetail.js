import {musicDetailed} from './components/musicDetailed.js'

const params = new URLSearchParams(window.location.search) // URLSearchParams is an api parsing an URL and window.location.search is a method getting the current URL 
const id = params.get('id') // getting the wanted params, available thanks to the parsing done in the variable "params" (here, we want the ID)

fetch(`http://localhost:8080/musics/${id}`) // fetching the URL with the ID typed by a user
  .then(response => response.json()) 
  .then(music => {
    const musicElement = document.getElementById('music')
    musicElement.innerHTML = musicDetailed(music)
  }) 