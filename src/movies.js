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
    spaceBetween: 30,
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

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'

function getGenresID(link){
  return link.getAttribute('id')
}

function buildApiUrl(genreID){
  return `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreID}`
}

async function loadMovies(apiUrl){
  try {

    const response = await fetch(apiUrl)
    const data = await response.json()

    const movies = data.results;
    
    clearSwiper()

    movies.forEach(movie =>{
      criaSwiperSlideImg(`https://image.tmdb.org/t/p/w500${movie.poster_path}`, `${movie.title}`)
    })

    
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

      
    })

    
  })
  linkGenres[0].click();
}

loadMoviesGenres()