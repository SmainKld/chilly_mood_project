// Function displaying musics details
export const musicDetailed = (music) => { 
  return `
    <div class = "music">
      <a href='/musicDetail.html?id=${music.id}'><h1>${music.title}</h1></a>
      <img src=${music.image}>
      <h2>${music.artist}</h2>
      <h2>Genre: ${music.genre}</h2>
      <h2>Featuring: ${music.featuring}</h2>
      <p>Sortie en: ${music.release}</p>
      <button id ="deleteThisFuckingMusic">Supprimer la musique</button>
    </div> 
`
}

