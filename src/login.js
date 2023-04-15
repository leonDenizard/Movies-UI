const body = document.querySelector('body')

function changeBackground(){
    
    const image = [
        "url(../assets/lightyear.jpg)",
        "url(../assets/guardians.jpg)",
        "url(../assets/cliff.png)",
        "url(../assets/john.jpg)",
        "url(../assets/john2.jpg)",
        "url(../assets/mandalorian.jpg)",
        "url(../assets/mario.jpg)",
        "url(../assets/shazam.jpg)",
        "url(../assets/spider.jpg)",
    ]

    const indexRandom = Math.floor(Math.random() * image.length)
    const imageSelected = image[indexRandom]
    body.style.backgroundImage = imageSelected

}


window.addEventListener('load', changeBackground)