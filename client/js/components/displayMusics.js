// Function displaying musics informations
export const displayMusics = (music) => { 
  return `
    <div class = "music">
      <a href='/musicDetail.html?id=${music.id}'><h1>${music.title}</h1></a>
      <h2>${music.artist}</h2>
      <p>${music.release}</p>
    </div> 
`
}

//Note about l.5 : "?id=" is the Query String allowing us to get the wanted ID