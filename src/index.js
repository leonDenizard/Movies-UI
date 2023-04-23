const btnmenu = document.querySelector('.container-icon')
const header = document.querySelector('header')
const swiper = document.querySelector('.swiper')
const swiperWrapper = document.querySelector('.swiper-wrapper')



//Função responsavél por abrir e fechar o menu do navbar
function toggleMenu(){
  header.classList.toggle('active')
  btnmenu.classList.toggle('active')
}
btnmenu.addEventListener('click', toggleMenu)

// Função global atualizaBackground
function atualizaBackground(movies, index){
  const movie = movies[index]
  const imgBackground = document.querySelector('#background');
  if (imgBackground) {
    imgBackground.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  }
}

//Função responsável por iniciar o Swiper
function loadSwiper(movies){
  let currentIndex = 0
  let swiperEffect = 'cards'

  if(window.innerWidth > 468 && window.innerWidth <= 768){
    swiperEffect = 'coverflow'
  }
  const swiper = new Swiper('.swiper', {
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
      },
    },
  });
}

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const api = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc`

async function loadMovies(){

  try {
    const response = await fetch(api)
    const data = await response.json()
    const movies = data.results

    // Criando os slides do Swiper
    movies.forEach(movie => {
      criaSwiperSlideImg(`https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    })  

    // Iniciando o Swiper e atualizando o background com o primeiro filme
    loadSwiper(movies)
    atualizaBackground(movies, 0)

  } catch (error) {
    console.log(error)
  }
  
}

loadMovies()




function criaSwiperSlideImg(src){

  const swiperSlide = document.createElement('div')
  swiperSlide.setAttribute('class', 'swiper-slide')

  swiperWrapper.appendChild(swiperSlide)

  const img = document.createElement('img')
  img.setAttribute('src', src)

  swiperSlide.appendChild(img)
}




