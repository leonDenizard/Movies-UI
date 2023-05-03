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




function loadSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  console.log('swiper carregado')
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

    console.log('funciono')
}



