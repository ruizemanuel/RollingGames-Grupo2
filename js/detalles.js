// let swiper = new Swiper(".mySwiper", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   coverflowEffect: {
//     rotate: 45,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: true,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });


let swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let listaJuegos = JSON.parse(localStorage.getItem("arrayJuegos")) || [];
let usuarioLogueado = JSON.parse(localStorage.getItem("arrayLogueado")) || [];
let login = document.getElementById("login")
let registro = document.getElementById("registro")
let itemNavbar = document.getElementById("itemNavbar")

if(usuarioLogueado.length != 0){
  verificarLogin()
}



let destacado = listaJuegos.find((itemProducto) => {
  return itemProducto.destacado === true;
});

let nombreJuego = document.getElementById("nombreJuego")
let imagenDestacado = document.getElementById("imagenDestacado")
let descDestacado = document.getElementById("descDestacado")
let catDestacado = document.getElementById("catDestacado")

nombreJuego.innerHTML = destacado.nombre
imagenDestacado.src = destacado.url
descDestacado.innerHTML = destacado.descripcion
catDestacado.innerHTML = `Categoria: ${destacado.categoria}`

function verificarLogin(){
  login.innerHTML = ""
  registro.innerHTML = "" 
  itemNavbar.innerHTML += `<li class="nav-item">
  <a class="posi nav-link">Bienvenido ${usuarioLogueado[0].nombre}</a>
</li>
<li class="nav-item">
  <a class="posi nav-link" href="./login.html" onclick='cerrarSesion("${usuarioLogueado}")'>Cerrar Sesion</a>
</li>`
}

window.cerrarSesion = function (logueado){
  login.innerHTML = "Login"
  registro.innerHTML = "Registro" 
  itemNavbar.innerHTML += ""
  logueado = []
  localStorage.setItem("arrayLogueado", JSON.stringify(logueado));
  
}



