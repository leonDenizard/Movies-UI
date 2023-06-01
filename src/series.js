const inputSearch = document.querySelector('#search')
const formInput = document.querySelector('#form-search')

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'
const imgPath = 'https://image.tmdb.org/t/p/w500'

//Função que constrói a requisição da busca do usuário
function buildQueryApi(query){
    const queryFormatade = query.toLowerCase().replace(/\s+/g, '+') 
    return `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${queryFormatade}&language=pt-BR`
}



function searchSerie(){
    formInput.addEventListener('submit', (event)=>{
        event.preventDefault()
        
        const query = inputSearch.value
        const api = buildQueryApi(query)
        
        loadSerie(api)

        inputSearch.blur()
        inputSearch.value = ""

        
    })
}

searchSerie()

function clearSeries(){
    const containerSerie = document.querySelectorAll('.serie')
    if(containerSerie){
        containerSerie.forEach(serie =>{
            serie.remove()
        })
    }
    
}

async function loadSerie(api){

    const response = await fetch(api)
    const data = await response.json()

    const series = data.results
    // console.log(series[0])
    clearSeries()


    series.forEach((serie, index) =>{
        if(serie.poster_path && serie.first_air_date !== ''){
            createSerie(serie.poster_path, serie.name, serie.origin_country, serie.first_air_date)
        }
        
        //Após criação das series, combina o index da serie criada na DOM com index da serie na API
        const wrapperSerie = document.querySelectorAll('.serie')[index]
        //Valida que existe um elemento criado para depois adicionar o listener
        if(wrapperSerie){
            wrapperSerie.addEventListener('click', ()=>{
                console.log(serie.id)
           })
        }
        
    })
    
}

function createSerie(src, nameSerie, originCountry, dateAir){

    const containerSerie = document.querySelector('.container-serie')

    const divSerie = document.createElement('div')
    divSerie.classList.add('serie')
    containerSerie.appendChild(divSerie)

    const imgBackground = document.createElement('img')
    imgBackground.setAttribute('id', 'background')
    imgBackground.src = `${imgPath}${src}`
    divSerie.appendChild(imgBackground)

    const divDetail = document.createElement('div')
    divDetail.classList.add('detail')
    divSerie.appendChild(divDetail)

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
    pDateAir.textContent = `Data de lançamento: ${formateDate(dateAir)}`
    divDetail.appendChild(pDateAir)

}

function formateDate(date){
    const [year, month, day] = date.split('-')
    const dateFormatade = `${day}/${month}/${year}`

    return dateFormatade
}

