import {musicDetailed} from './components/musicDetailed.js'

const params = new URLSearchParams(window.location.search) // URLSearchParams is an api parsing an URL and window.location.search is a method getting the current URL 
const id = params.get('id') // getting the wanted params, available thanks to the parsing done in the variable "params" (here, we want the ID)

fetch(`http://localhost:8080/musics/${id}`) // fetching the URL with the ID typed by a user
  .then(response => response.json()) 
  .then(music => {
    const musicElement = document.getElementById('music') 
    musicElement.innerHTML = musicDetailed(music) // injection in HTML

    document.getElementById('deleteThisFuckingMusic').addEventListener('click', event => { //getting the id 'deleteThisFuckingMusic' defined on the form of addMusic.html
      event.preventDefault() // preventing from loading the datas at each send request 
      fetch(`http://localhost:8080/musics/${id}`, {
        method: 'delete', // defining the method to apply 
      })

    })
  }) 

