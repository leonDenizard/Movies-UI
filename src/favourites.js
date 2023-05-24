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
    wrapperMovie.appendChild(i)

    const divDetail = document.createElement('div')
    divDetail.classList.add('detail')
    wrapperMovie.appendChild(divDetail)

    const divImdb = document.createElement('div')
    divImdb.classList.add('imdb')
    divDetail.appendChild(divImdb)

    const pImdb = document.createElement('p')
    pImdb.textContent = imdb.toFixed(2)
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

       movies.push(movie)
    }


    console.log(movies)

    movies.forEach((movie, index) =>{
        createGrid(movie.poster_path, movie.vote_average, movie.title)

        const wrapperMovie = document.querySelectorAll('.wrapper-movie')[index]
        wrapperMovie.addEventListener('click', () => {
          changeBackground(movie)
        })        
    })
    changeBackground(movies[0])



  } catch (error) {
    console.log(error)
  }
}
loadFavourites();