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
const imgProfileSize = 'w185'

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
  spanDataLancamento.textContent = ` ${dataFormatada} (BR)`

}
function atualizaGenero(generos, index) {
  const movieGeneros = document.querySelector('#movie-genres')
  movieGeneros.textContent = ` ${generos[index]}`
}
function gerarDuracaoAleatoria() {
  const minutosTotais = Math.floor(Math.random() * (175 - 110 + 1)) + 110; // gera um número aleatório entre 110 e 175
  const horas = Math.floor(minutosTotais / 60);
  const minutos = minutosTotais % 60;
  return ` ${horas.toString().padStart(2, '0')}h${minutos.toString().padStart(2, '0')}m`;
}

function atualizaDuracaoFilme(){
  const movieDuraction = document.querySelector('#movie-duraction')
  movieDuraction.textContent = gerarDuracaoAleatoria()
}

function atualizaNotaFilme(nota, index){
  const notaFilme = document.querySelector('#avaliation-value')
  const notaMaxima = 10 // Define a nota máxima

  notaFilme.textContent = nota[index]

  const containerAvaliation = document.querySelector('.container-value')
  const proporcaoNota = nota[index] / notaMaxima // Calcula a proporção da nota em relação à nota máxima
  containerAvaliation.style.backgroundImage = `conic-gradient(#d644ff ${proporcaoNota * 25}%, #ff0095 ${proporcaoNota * 50}%, #ff651a ${proporcaoNota * 75}%, #e6b800 ${proporcaoNota * 99}%, transparent ${proporcaoNota * 100}%)`

}


function atualizaSinopse(snopses, index){
  const sinopse = document.querySelector('.movie-sinopse > p')

  sinopse.textContent = snopses[index]
}

function atualizaDetalheAtores(atoresId){

  const containerProfile = document.querySelector('.profile')
  const nomeAtor = document.querySelector('#name-actor')

  async function loadNames(atoresId){

    try {

      const api = `https://api.themoviedb.org/3/movie/${atoresId}/credits?api_key=${key}&language=pt-BR`
      const response = await fetch(api)
      const data = await response.json()

      const cast = data.cast.slice(0, 4)

      // console.log(cast)
      const nomeAtores = cast.map(ator => ator.name)
      // console.log(nomeAtores)

      
      nomeAtor.textContent = nomeAtores.join(', ')

      
      containerProfile.innerHTML = ''
      
      cast.forEach(ator => {
        if(ator.profile_path){
          criaImgAtor(`${linkImagens}${imgProfileSize}${ator.profile_path}`)
        }
        
      })
    
      

    } catch (error) {
      console.log(error)
    }
    
  }
  loadNames(atoresId)

}

function criaImgAtor(src){
  const containerProfile = document.querySelector('.profile')
  const imgProfile = document.createElement('img')
  imgProfile.src = src
   
  containerProfile.appendChild(imgProfile)

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
function loadSwiper(movies, titles, ano, datas, generos, notas, sinopses, actoresId){
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
      rotate: 0,
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
        atualizaDuracaoFilme(movies, currentIndex)
        atualizaNotaFilme(notas, currentIndex)
        atualizaSinopse(sinopses, currentIndex)
        atualizaDetalheAtores(actoresId[currentIndex], currentIndex)
      },
    },
  });
}

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const api = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=pt-BR&sort_by=popularity.desc&page=3`

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
    console.log(movies)
    
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

    //criando um novo array percorrendo os genre_ids com o que já tem gravado generosTotal trazendo um array com os nomes
    const generos = movies.map(movie => movie.genre_ids.map(genreId => generosTotal[genreId]).join(', '));
    //criando um array de notas dos filmes
    const notas = movies.map(movie => movie.vote_average)
    const sinopses = movies.map(movie => movie.overview)
    //criando um novo array para armazenar od ids dos filmes
    const idsFilme = movies.map(movie => movie.id)
    
    
    // console.log(idsFilme)

    // Iniciando o Swiper e atualizando o background com o primeiro filme
    loadSwiper(movies, titles, ano, datas, generos, notas, sinopses, idsFilme)
    atualizaBackground(movies, 0)
    //Carrega titulo do filme
    atualizaTitulo(titles, 0)
    //carrega ano filme
    atualizaAno(ano, 0)
    //carrega data de lançamento
    atualizaDataLancamento(datas, 0)
    //carrego generos em cada filme
    atualizaGenero(generos, 0)
    //Atualiza duração do filme aleatoriamente
    atualizaDuracaoFilme(movies, 0)
    //Atualiza notas filme
    atualizaNotaFilme(notas, 0)
    atualizaSinopse(sinopses, 0)
    atualizaDetalheAtores(idsFilme, 0)

    const containerData = document.querySelector('.container-data')

    if(window.innerWidth <= 768){
      const imgCarrosel = document.querySelectorAll('.swiper-slide > img')
      
      imgCarrosel.forEach(img => {
        img.addEventListener('click', (event)=>{
          event.stopPropagation()
          containerData.style.display = 'block'
        })
      })

      document.body.addEventListener('click', ()=>{
        containerData.style.display = 'none'
      })
    }
    
    loadDiv.style.display = 'none';
  } catch (error) {
    console.log(error)
  }
  
}


const loadDiv = document.getElementById('load');
window.addEventListener('load', loadMovies);

// https://api.themoviedb.org/3/movie/640146/credits
// https://api.themoviedb.org/3/movie/640146/credits?api_key=fd298ef799ed7bc469fd73887cdfcc2e&language=pt-BR

const listLinks = document.querySelectorAll('.list-link > li');

listLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove a classe "active" de todos os links
    listLinks.forEach(efeito => efeito.classList.remove('active'));

    // Adiciona a classe "active" apenas no link clicado
    link.classList.add('active');
  });
});

// Define o primeiro link como ativo ao carregar a página
listLinks[0].classList.add('active');


