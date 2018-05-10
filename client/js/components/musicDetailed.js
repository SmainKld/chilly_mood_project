// Function displaying musics details
export const musicDetailed = (music) => { 
  return `
    <div class = "music">
      <a href='/musicDetail.html?id=${music.id}'><h1>${music.title}</h1></a>
      <img src=${music.image}>
      <h2>${music.artist}</h2>
      <h2>Featuring: ${music.genre}</h2>
      <h2>Date de sortie: ${music.featuring}</h2>
      <p>${music.release}</p>
      <form id = "deleteThisMusic">
      <button class="deleteMusic" id="${music.id}">Supprimer la musique</button>
      </form>
    </div> 
`
}

