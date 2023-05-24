const favourites = localStorage.getItem("movieIds")
const cleanFavourites = favourites.slice(1, -1)

const ids = cleanFavourites.split(",");

const key = "fd298ef799ed7bc469fd73887cdfcc2e";


function createGrid(src, imdb, title){

    //Ponto onde será inserido os elementos
    const containerFavourite = document.querySelector('.container-favourite')

    const wrapperMovie = document.createElement('div')
    wrapperMovie.classList.add('wrapper-movie')

    containerFavourite.appendChild(wrapperMovie)

    //criando a imagem que recebera o src da API
    const imgMovie = document.createElement('img')
    imgMovie.src = `https://image.tmdb.org/t/p/w500${src}`
    wrapperMovie.appendChild(imgMovie)

    // Criado o icone do coração e adicionando as classe e inserindo dentro de wrapper-movie
    const i = document.createElement('i')
    i.classList.add('fa-sharp')
    i.classList.add('fa-solid')
    i.classList.add('fa-heart')
    i.classList.add('active')
    wrapperMovie.appendChild(i)

    const divDetail = document.createElement('div')
    divDetail.classList.add('detail')
    wrapperMovie.appendChild(divDetail)

    const divImdb = document.createElement('div')
    divImdb.classList.add('imdb')
    divDetail.appendChild(divImdb)

    const pImdb = document.createElement('p')
    pImdb.textContent = `${imdb.toFixed(2)} IMDB`
    divImdb.appendChild(pImdb)

    const divTitleMovie = document.createElement('div')
    divTitleMovie.classList.add('title-movie')
    divDetail.appendChild(divTitleMovie)

    const pTitle = document.createElement('p')
    pTitle.textContent = title
    divTitleMovie.appendChild(pTitle)

}

function changeBackground(movie) {

   const imgBackground = document.querySelector('#background')
   if (movie.backdrop_path) {
    imgBackground.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
   }
  
}

async function loadFavourites() {
  try {

    const movies = []

    for(id of ids){
       const api =  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`
       const response = await fetch(api)
       const movie = await response.json()

       if (response.ok) {
            movies.push(movie);
        } else {
            console.log(`Erro ao obter o filme com ID ${id}: ${movie.status_message}`);
        }
    }
    
    if(movies.length === 0){
        createClearFavourites()
    }else{
        movies.forEach((movie, index) =>{
            createGrid(movie.poster_path, movie.vote_average, movie.title)
    
            const wrapperMovie = document.querySelectorAll('.wrapper-movie')[index]
            wrapperMovie.addEventListener('click', () => {
              changeBackground(movie)
            })   
            
            const favourite = document.querySelectorAll('.wrapper-movie > i.active')[index]
            favourite.addEventListener('click', ()=>{
                
                const movieId = movie.id
    
                removeFromFavoritesLocalStorage(movieId)
                favourite.classList.remove('active')
    
                wrapperMovie.remove()

                const containerFavourite = document.querySelector('.container-favourite')
                if (containerFavourite.childElementCount === 0) {
                    createClearFavourites()
                  }
               
            })
            
        })
        changeBackground(movies[0])

    }


    



  } catch (error) {
    console.log(error)
  }
}
loadFavourites();

function removeFromFavoritesLocalStorage(movieId){
    //Verifica se já existem IDs de filmes no localStorage
    const savedMovieIds = JSON.parse(localStorage.getItem('movieIds')) || []

    //verifica se o ID do filme está presente na lista de favoritos
    const index = savedMovieIds.indexOf(movieId)
    if (index > -1){
        savedMovieIds.splice(index, 1)
    }

    //Salva a lista atualizada de IDs de filme no localStorage
    localStorage.setItem('movieIds', JSON.stringify(savedMovieIds))
}

function createClearFavourites(){

    const containerFavourite = document.querySelector('.container-favourite')

    const divClearFavourite = document.createElement('div')
    divClearFavourite.classList.add('clear-favourite')
    containerFavourite.appendChild(divClearFavourite)

    const pText = document.createElement('p')
    pText.textContent = 'Ops parece que você não tem favoritos'
    divClearFavourite.appendChild(pText)

    const i = document.createElement('i')
    i.classList.add('ph')
    i.classList.add('ph-heart-break')
    divClearFavourite.appendChild(i)
    
}
