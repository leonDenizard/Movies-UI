const btnmenu = document.querySelector('.container-icon')
const header = document.querySelector('header')
const swiperWrapper = document.querySelector('.swiper-wrapper')

//Função responsavél por abrir e fechar o menu do navbar
function toggleMenu(){
  header.classList.toggle('active')
  btnmenu.classList.toggle('active')
}
btnmenu.addEventListener('click', toggleMenu)


//Declaração do caminho da imagem e tamanho
const linkImagens = 'https://image.tmdb.org/t/p/'
const img1280 = 'w1280'
const imgPoster = 'w500'
const imgOriginal = 'original'

// Função responsavel por atualizaBackground do fundo da pagina
function atualizaBackground(movies, index){

  const movie = movies[index]
  const imgBackground = document.querySelector('#background');

  imgBackground.src = `${linkImagens}${img1280}${movie.backdrop_path}`;
  
}

//função que recebe um array de titulo e muda conforme o swiper tem alteração
function atualizaTitulo(titulos, index){

  const tituloFilme = document.querySelector('#movie-title')
  tituloFilme.textContent = titulos[index]
}

function atualizaAno(ano, index){
  const anoFormatado = ano[index].slice(0, 4)
  const anoFilme = document.querySelector('#movie-year')
  anoFilme.textContent = anoFormatado
}
function atualizaDataLancamento(datas, index){

  const [ano, mes, dia] = datas[index].split('-')
  const dataFormatada = `${dia}/${mes}/${ano}`

  const spanDataLancamento = document.querySelector('#movie-date-launch')
  spanDataLancamento.textContent = `${dataFormatada} (BR)`

}
function atualizaGenero(generos, index) {
  const movieGeneros = document.querySelector('#movie-genres')
  movieGeneros.textContent = generos[index]
}


//função cria slide do swiper
function criaSwiperSlideImg(src){

  const swiperSlide = document.createElement('div')
  swiperSlide.classList.add('swiper-slide')
  swiperWrapper.appendChild(swiperSlide)

  const img = document.createElement('img')
  img.src = src

  swiperSlide.appendChild(img)
}

//Função responsável por iniciar o Swiper
let swiper; // variável global

//Função responsável por iniciar o Swiper
function loadSwiper(movies, titles, ano, datas, generos){
  let currentIndex = 0
  let swiperEffect = 'cards'

  if(window.innerWidth > 468 && window.innerWidth <= 768){
    swiperEffect = 'coverflow'
  }else if(window.innerWidth > 768){
    swiperEffect = 'coverflow'
  }
  
  swiper = new Swiper('.swiper', {
    effect: swiperEffect,
    cardsEffect:{
      rotate: true,
      perSlideRotate: 10,
      slideShadows: true,
      loop: true
    },
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    on:{
      slideChange: function(){
        currentIndex = this.realIndex
        atualizaBackground(movies, currentIndex)
        atualizaTitulo(titles, currentIndex)
        atualizaAno(ano, currentIndex)
        atualizaDataLancamento(datas, currentIndex)
        atualizaGenero(generos, currentIndex)
      },
    },
  });
}

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const api = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc`

const generosTotal = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Familia',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção científica',
  10770: 'Cinema TV',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste'
};

async function loadMovies(){

  try {
    const response = await fetch(api)
    const data = await response.json()
    const movies = data.results

    // Criando os slides do Swiper
    movies.forEach(movie => {
      criaSwiperSlideImg(`${linkImagens}${imgPoster}${movie.poster_path}`)
    })
    
    //criando um novo array de titulos somente com os titulos do objeto
    const titles = movies.map(movie => movie.title)
    //criando um novo array de ano
    const ano = movies.map(movie => movie.release_date)
    //criando um array de datas
    const datas = movies.map(movie => movie.release_date)

    const generos = movies.map(movie => movie.genre_ids.map(genreId => generosTotal[genreId]).join(', '));
    
    // Iniciando o Swiper e atualizando o background com o primeiro filme
    loadSwiper(movies, titles, ano, datas, generos)
    atualizaBackground(movies, 0)
    //Carrega titulo do filme
    atualizaTitulo(titles, 0)
    //carrega ano filme
    atualizaAno(ano, 0)
    //carrega data de lançamento
    atualizaDataLancamento(datas, 0)
    //carrego generos em cada filme
    atualizaGenero(generos, 0)
    
    
  } catch (error) {
    console.log(error)
  }
  
}

loadMovies()

