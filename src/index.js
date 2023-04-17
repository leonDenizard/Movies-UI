const body = document.querySelector("body"),
  imgWrapper = document.querySelectorAll(".img-wrapper"),
  imgCenter = document.querySelector(".wrapper-player > img");

for (const iterator of imgWrapper) {
  const img = iterator.querySelector("img");

  iterator.addEventListener("click", () => {
    body.style.backgroundImage = `url(${img.getAttribute("src")})`;
    imgCenter.setAttribute("src", img.getAttribute("src"));
  });
}

//close nav

const btnClose = document.querySelector("#close");
const nav = document.querySelector("nav");
btnClose.addEventListener("click", () => {
  nav.classList.toggle("closed");

  if (nav.classList.contains("closed")) {
    btnClose.classList.remove("ph-x");
    btnClose.classList.add("ph-list");
  } else {
    btnClose.classList.remove("ph-list");
    btnClose.classList.add("ph-x");
  }
});

//indicator page list

const listPage = document.querySelectorAll(".header-start ul li a");

function handleClick(event) {
  //first remove class menu
  listPage.forEach((a) => {
    a.classList.remove("menu");
  });

  //add class menu in element clicked
  event.currentTarget.classList.add("menu");
}

listPage.forEach((a) => {
  a.addEventListener("click", handleClick);

  const icon = a.querySelector("i");
  if (icon) {
    icon.addEventListener("click", handleClick);
  }
});

function loadSwipper() {
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,

    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
  });
}

window.addEventListener("load", loadSwipper);
