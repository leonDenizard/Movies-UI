const inputSearch = document.querySelector('#search')
const formInput = document.querySelector('#form-search')

const key = 'fd298ef799ed7bc469fd73887cdfcc2e'

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
        console.log(api)
    })
}

searchSerie()