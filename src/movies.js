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
    //Cria swiper-slide
    const swiperSlide = document.createElement('swiper-slide')
    
    //cria a div com a classe wrapper-slide
    const divWrapperSlide = document.createElement('div')
    divWrapperSlide.classList.add('wrapper-slide')

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

    //Adiciona swiper-slide dentro do swiper-container
    swiper.appendChild(swiperSlide)
    //Adiciona div wrapper-slide dentro do elemento swiper-slide
    swiperSlide.appendChild(divWrapperSlide)
    //Adiciona img dentro da divWrapperSlide
    divWrapperSlide.appendChild(img)
    //Adiciona o icone dentro da divWrapperSlide
    divWrapperSlide.appendChild(i)
    //Adiciona titulo no divWrapperSlide
    divWrapperSlide.appendChild(tituloH3)

    console.log('funciono')
}


