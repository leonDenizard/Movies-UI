const btnmenu = document.querySelector('.container-icon')
const header = document.querySelector('header')
const swiper = document.querySelector('.swiper');




function toggleMenu(){
  header.classList.toggle('active')
}
btnmenu.addEventListener('click', toggleMenu)


function loadSwiper(){
  const swiper = new Swiper('.swiper', {
    effect: "cards",
    cardsEffect:{
      rotate: true,
      perSlideRotate: 10,
      slideShadows: true,
    },
    loop: true,
  });
}


window.addEventListener('load', loadSwiper)