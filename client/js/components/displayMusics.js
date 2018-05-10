// Function displaying musics informations
export const displayMusics = (music) => { 
  return `
    <div class = "musics">
      <a href='/musicDetail.html?id=${music.id}'>
      <h1>${music.title}</h1></a>
      <img src= ${music.image}>
      <h2> Artiste: ${music.artist}</h2>

    </div> 
`
}

//Note about l.5 : "?id=" is the Query String allowing us to get the wanted ID