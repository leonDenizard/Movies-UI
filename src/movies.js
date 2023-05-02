const btnMenu = document.querySelector('.container-icon')
const headerMenu = document.querySelector('.container-menu')

function toggleMenu(){
    btnMenu.classList.toggle('active')
    headerMenu.classList.toggle('active')

}
btnMenu.addEventListener('click', toggleMenu)

const listLinks = document.querySelectorAll('.container-menu > ul > li')

listLinks.forEach(link => {
    link.addEventListener('click', ()=>{
        listLinks.forEach(efeito => efeito.classList.remove('active'))

        link.classList.add('active')
    })
})
listLinks[0].classList.add('active')

function loadSwiper(){
    swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}
loadSwiper()