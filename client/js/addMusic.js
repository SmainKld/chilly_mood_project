  document.getElementById('addMusic').addEventListener('submit', event => { //getting the id 'addMusic' defined on the form of addMusic.html
    event.preventDefault() // preventing from loading the datas at each send request 
    const title = document.getElementById('addMusicTitle').value //selecting the ID defined and display the value typped by the user on the input
    const artist = document.getElementById('addMusicArtist').value
    const release = document.getElementById('addMusicRelease').value

    fetch('http://localhost:8080/musics', {
      method: 'post', //method used to display the data
      body: JSON.stringify({ // turning the value typped by the user into JSON
        title: title, // defining the keys wanted in the JSON object and linking it to the values defined above by the user
        artist: artist,
        release: release
      })  
    }).then(res => console.log(res.status))
})