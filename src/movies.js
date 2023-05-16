const btnMenu = document.querySelector(".container-icon");
const headerMenu = document.querySelector(".container-menu");


function toggleMenu() {
  btnMenu.classList.toggle("active");
  headerMenu.classList.toggle("active");
}
btnMenu.addEventListener("click", toggleMenu);

const listLinks = document.querySelectorAll(".container-menu > ul > li");

listLinks.forEach((link) => {
  link.addEventListener("click", () => {
    listLinks.forEach((efeito) => efeito.classList.remove("active"));

    link.classList.add("active");
  });
});
listLinks[0].classList.add("active");




let swiper = document.querySelector('.swiper')
function loadSwiper() {
  swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
  })
}
loadSwiper();


function criaSwiperSlideImg(src, titulo) {
    //Cria a div swiper-slide e adiciona a classe swipper-slide
    const swiperSlide = document.createElement('div')
    swiperSlide.classList.add('swiper-slide')

    //cria a div com a classe content-slide
    const divContentSlide = document.createElement('div')
    divContentSlide.classList.add('content-slide')

    //cria img e atribui o src do parametro
    const img = document.createElement('img')
    img.src = src

    //cria o icone e adiciona a classe do phosphoricon
    const i = document.createElement('i')
    i.classList.add('fa-sharp')
    i.classList.add('fa-solid')
    i.classList.add('fa-heart')

    //cria o titulo do filme e atualiza com titulo do parametro
    const tituloH3 = document.createElement('h3')
    tituloH3.textContent = titulo

    //Seleciona o ponto onde será incluído o swiper-slide
    const swiperWrapper = document.querySelector('.swiper-wrapper')
    swiperWrapper.appendChild(swiperSlide)

    //Adiciona a div content-slide dentro do swiper-slide
    swiperSlide.appendChild(divContentSlide)
    //Adiciona o restante dos elementos dentro da div content-slide
    divContentSlide.appendChild(img)
    divContentSlide.appendChild(i)
    divContentSlide.appendChild(tituloH3)
}

function clearSwiper(){
  const swiperWrapper = document.querySelector('.swiper-wrapper')
  swiperWrapper.innerHTML = ''
}

function createGrid(src, titulo){
  // Ponto onde será criado os filmes via js
  const wrapperMovieResult = document.querySelector('.wrapper-movie-result')

  // Criar a div wrapper-movie e adicionar a classe .wrapper-movie
  const wrapperMovie = document.createElement('div')
  wrapperMovie.classList.add('wrapper-movie')

  //Adicionando a div dentro do wrapper pai
  wrapperMovieResult.appendChild(wrapperMovie)

  //criando a imagem que recebera o src da API
  const imgMovie = document.createElement('img')
  imgMovie.src = src

  //Adicionando a imagem ao wrapper-movie
  wrapperMovie.appendChild(imgMovie)

  // Criado o icone do coração e adicionando as classe e inserindo dentro de wrapper-movie
  const i = document.createElement('i')
  i.classList.add('fa-sharp')
  i.classList.add('fa-solid')
  i.classList.add('fa-heart')
  wrapperMovie.appendChild(i)

  //Criando a div title movie e adicionando no wrapper-movie
  const titleMovie = document.createElement('div')
  titleMovie.classList.add('title-movie')
  wrapperMovie.appendChild(titleMovie)

  //Criando o texto do titulo e atribuindo o valor da API
  const tituloP = document.createElement('p')
  tituloP.textContent = titulo
  titleMovie.appendChild(tituloP)

}

//Função responsável por limpar o grid para não acumular filmes ao filtrar 
function clearGrid(){
  // Limpar o wrapper-movie criado via js
  const wrapperMovie = document.querySelectorAll('.wrapper-movie')
  //Verifica se existe o elemento e percorre cada um limpando seu conteudo e depois é criado novos wrapper-movie
  if(wrapperMovie){
    wrapperMovie.forEach(wrapper =>{
      wrapper.innerHTML = ''
    })
  }

}


const key = 'fd298ef799ed7bc469fd73887cdfcc2e'

function getGenresID(link){
  return link.getAttribute('id')
}
const page = 1;

function buildApiUrl(genreID){
  return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreID}&page=${page}`
}


async function loadMovies(apiUrl){
  try {

    const response = await fetch(apiUrl)
    const data = await response.json()

    const movies = data.results;
    
    clearSwiper()
    

    movies.forEach((movie, index) =>{

      criaSwiperSlideImg(`https://image.tmdb.org/t/p/w500${movie.poster_path}`, `${movie.title}`)

      //Criado vinculo entre o slide criado com o index do filme na api para poder carregar os dados pelo click
      const slide = document.querySelectorAll('.swiper-slide')[index]
      slide.addEventListener('click', ()=>{
        changeBackground(movie)
      })
    })

    changeBackground(movies[0])
    changeColorFavorite()

    // Caso telas maiores que 1024px não terá swiper e op resultado será mostrado via grid
    if(window.innerWidth >= 1024){
      clearSwiper()
      clearGrid()
      

      movies.forEach((movie, index) =>{
        createGrid(`https://image.tmdb.org/t/p/w500${movie.poster_path}`, `${movie.title}`)
        
        const wrapperMovie = document.querySelectorAll('.wrapper-movie')[index]
        wrapperMovie.addEventListener('click', ()=>{
          changeBackground(movie)
        })
      })

      changeColorFavoriteDesktop()
      
    }

  } catch (error) {
    console.log(error)
  }
}

function loadMoviesGenres(){
  const linkGenres = document.querySelectorAll('header ul li > a')

  linkGenres.forEach( link => {
    link.addEventListener('click', async event =>{
      
      const genreID = getGenresID(link)
      const apiUrl = buildApiUrl(genreID)

      await loadMovies(apiUrl)
      swiper.slideTo(0);

      headerMenu.classList.remove('active')
      btnMenu.classList.remove('active')
    })

    
  })
  linkGenres[0].click();
}

loadMoviesGenres()

function changeColorFavorite(){
  const icone = document.querySelectorAll('.swiper-slide .content-slide > i')
  icone.forEach(i =>{
    i.addEventListener('click', ()=>{
      i.classList.toggle('active')
    })
  })
}
function changeColorFavoriteDesktop(){
  const icone = document.querySelectorAll('.wrapper-movie > i')
  icone.forEach(i =>{
    i.addEventListener('click', ()=>{
      i.classList.toggle('active')
    })
  })
}


function changeBackground(movie){

  const imgBackground = document.querySelector('#background')
  const imdbDiv = document.querySelector('.avaliation-data')
  
  imgBackground.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
  imdbDiv.textContent = `${movie.vote_average.toFixed(1)} IMDB`

}

function buildQueryApi(query){

  const queryFormatade = query.toLowerCase().replace(/\s+/g, '+')

  
  return `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${queryFormatade}&language=pt-BR`
}

async function searchMovieApi(api){
  try {
    const response = await fetch(api)
    const data = await response.json()

    const movies = data.results

    clearSwiper()

    const slides = []
    movies.forEach((movie, index) =>{

      if(movie.backdrop_path){
        criaSwiperSlideImg(`https://image.tmdb.org/t/p/w500${movie.poster_path}`, `${movie.title}`)

        const slide = document.querySelectorAll('.swiper-slide')[index]
        slides.push(slide)
      }
      
    })

    changeBackground(movies[0])
    changeColorFavorite()

    slides.forEach((slide, index)=>{
      if(slide){
        slide.addEventListener('click', ()=>{
          changeBackground(movies[index])
        })
      }
      
    })
    
  } catch (error) {
    console.log(error)
  }
}

function searchInput(){
  const inputSearch = document.querySelector('#search')
  const form = document.querySelector('#form-search')
  
  form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const query = inputSearch.value
    const api = buildQueryApi(query)

    searchMovieApi(api)
    swiper.slideTo(0);
    inputSearch.blur()

    inputSearch.value = ""

    
  })
  

}

searchInput()

