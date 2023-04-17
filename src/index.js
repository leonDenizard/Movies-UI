const btnmenu = document.querySelector('.container-icon')
const wrapperMenu = document.querySelector('.wrapper-menu')

function toggleMenu(){
  wrapperMenu.classList.toggle('active')
}
btnmenu.addEventListener('click', toggleMenu)