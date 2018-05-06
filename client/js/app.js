console.log('Loaded')

fetch('http://localhost:8080/musics')
  .then(response => response.json())
  .then (musics => {
    const musicsElement = document.getElementById('musics')
    
    musicsElement.innerHTML = JSON.stringify(musics)
    console.log(musics)
  })