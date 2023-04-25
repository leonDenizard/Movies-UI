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
function loadSwiper(movies, titles, ano, datas){
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
      },
    },
  });
}

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const api = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc`
const apiCertification = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=1`
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

    // Iniciando o Swiper e atualizando o background com o primeiro filme
    loadSwiper(movies, titles, ano, datas)
    atualizaBackground(movies, 0)
    //Carrega titulo do filme
    atualizaTitulo(titles, 0)
    //carrega ano filme
    atualizaAno(ano, 0)
    //carrega data de lançamento
    atualizaDataLancamento(datas, 0)

    console.log(movies[0])
    
    
  } catch (error) {
    console.log(error)
  }
  
}

loadMovies()

