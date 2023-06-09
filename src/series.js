const inputSearch = document.querySelector('#search')
const formInput = document.querySelector('#form-search')

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const imgPath = 'https://image.tmdb.org/t/p/w500'

// Função que constrói a requisição da busca do usuário
function buildQueryApi(query) {
  const queryFormatade = query.toLowerCase().replace(/\s+/g, '+')
  return `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${queryFormatade}&language=pt-BR`
}

const loadApi = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&sort_by=popularity.desc&language=pt-BR`
loadSerie(loadApi)

function searchSerie() {
  formInput.addEventListener('submit', (event) => {
    event.preventDefault()

    const query = inputSearch.value
    const api = buildQueryApi(query)

    loadSerie(api)

    inputSearch.blur()
    inputSearch.value = ''
  })
}

searchSerie()

function clearSeries() {
  const containerSerie = document.querySelector('.container-serie')
  if (containerSerie) {
    containerSerie.innerHTML = ''
  }
}

async function loadSerie(api) {
  const response = await fetch(api)
  const data = await response.json()

  const series = data.results
  clearSeries()

  series.forEach((serie) => {
    if (serie.poster_path && serie.first_air_date !== '' && serie.backdrop_path) {
      const wrapperSerie = createSerie(
        serie.poster_path,
        serie.name,
        serie.origin_country,
        serie.first_air_date
      )

      wrapperSerie.addEventListener('click', () => {
        if (wrapperSerie.classList.contains('active')) {
          removeEpisodes(wrapperSerie)
        } else {
          loadEpisode(serie.id, wrapperSerie)
        }
        wrapperSerie.classList.toggle('active')
      })

      if (window.innerWidth >= 1024) {
        wrapperSerie.classList.add('active')
        loadEpisode(serie.id, wrapperSerie);
      }
    }
  })
}

function removeEpisodes(wrapperSerie) {
  const containerEpisode = wrapperSerie.querySelector('.container-episode')
  if (containerEpisode) {
    containerEpisode.innerHTML = ''
  }
}

function createSerie(src, nameSerie, originCountry, dateAir) {
  const containerSerie = document.querySelector('.container-serie')

  const wrapperSerie = document.createElement('div')
  wrapperSerie.className = 'wrapper-serie'
  containerSerie.appendChild(wrapperSerie)

  const contentSerie = document.createElement('div')
  contentSerie.className = 'content-serie'
  wrapperSerie.appendChild(contentSerie)

  const imgBackground = document.createElement('img')
  imgBackground.setAttribute('id', 'background')
  imgBackground.src = `${imgPath}${src}`
  contentSerie.appendChild(imgBackground)

  const divDetail = document.createElement('div')
  divDetail.classList.add('detail')
  contentSerie.appendChild(divDetail)

  const h1NameSerie = document.createElement('h1')
  h1NameSerie.className = 'name-serie'
  h1NameSerie.textContent = nameSerie
  divDetail.appendChild(h1NameSerie)

  const pOriginCountry = document.createElement('p')
  pOriginCountry.className = 'origin-country'
  pOriginCountry.textContent = `País de origem: ${originCountry}`
  divDetail.appendChild(pOriginCountry)

  const pDateAir = document.createElement('p')
  pDateAir.className = 'date-air'
  pDateAir.textContent = `Data de lançamento: ${formatDate(dateAir)}`
  divDetail.appendChild(pDateAir)

  const containerEpisode = document.createElement('div')
  containerEpisode.className = 'container-episode'
  wrapperSerie.appendChild(containerEpisode)

  return wrapperSerie
}

function formatDate(date) {
  const [year, month, day] = date.split('-')
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}

async function loadEpisode(id, wrapperSerie) {
  const url = `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${key}&language=pt-BR`

  const response = await fetch(url)
  const data = await response.json()
  const episodes = data.episodes

  episodes.forEach((episode) => {
    if (episode.still_path) {
      createEpisode(
        episode.still_path,
        episode.episode_number,
        episode.name,
        wrapperSerie
      )
    } 
  })
}

function createEpisode(src, number_episode, title, wrapperSerie) {
  const containerEpisode = wrapperSerie.querySelector('.container-episode')

  const wrapperEpisode = document.createElement('div')
  wrapperEpisode.className = 'wrapper-episode fade-in'
  containerEpisode.appendChild(wrapperEpisode)

  const img = document.createElement('img')
  img.className = 'img-episode'
  img.src = `${imgPath}${src}`
  wrapperEpisode.appendChild(img)

  const pNumberEpisode = document.createElement('p')
  pNumberEpisode.className = 'number-episode'
  pNumberEpisode.textContent = `Episódio: ${number_episode}`
  wrapperEpisode.appendChild(pNumberEpisode)

  const titleEpisode = document.createElement('p')
  titleEpisode.className = 'title-episode'
  titleEpisode.textContent = title
  wrapperEpisode.appendChild(titleEpisode)

  containerEpisode.addEventListener('click', (event) => {
    event.stopPropagation()
  })

  wrapperEpisode.addEventListener('click', (event) => {
    event.stopPropagation()
  })

  setTimeout(() => {
    wrapperEpisode.classList.remove('fade-in');
  }, 100);
}
