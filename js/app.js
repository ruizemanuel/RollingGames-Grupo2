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

let juegosAccion = listaJuegos.filter((juegos) => {
  return juegos.categoria === "Accion";
});
let tituloAccion = document.getElementById("accion")
if(juegosAccion.length == 0){
  tituloAccion.innerHTML = ""
}
juegosAccion.map((item) => { crearColumna(item) });


let juegosDisparos = listaJuegos.filter((juegos) => {
  return juegos.categoria === "Disparos";
});
let tituloDisparos = document.getElementById("disparos")
if(juegosDisparos.length == 0){
  tituloDisparos.innerHTML = ""
}
juegosDisparos.map((item) => { crearColumnaDis(item) });



let juegosAventura = listaJuegos.filter((juegos) => {
  return juegos.categoria === "Aventura";
});
let tituloAventura = document.getElementById("aventura")
if(juegosAventura.length == 0){
  tituloAventura.innerHTML = ""
}
juegosAventura.map((item) => { crearColumnaAven(item) });



let juegosDeportes = listaJuegos.filter((juegos) => {
  return juegos.categoria === "Deportes";
});
let tituloDeportes = document.getElementById("deportes")
if(juegosDeportes.length == 0){
  tituloDeportes.innerHTML = ""
}
juegosDeportes.map((item) => { crearColumnaDep(item) });

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

function crearColumna(juego) {
  if (juego.publicado == true) {
    let grilla = document.getElementById('grilla');
    grilla.innerHTML += ` <div class="col-12 col-md-4 col-lg-3 mb-3 mx-3">
        <div class="card h-100">
          <img src="${juego.url}" class="card-img-top" alt="${juego.nombre}">
          
        </div>
      </div>`
  }

};

function crearColumnaDis(juego) {
  if (juego.publicado == true) {
    let grilla = document.getElementById('grilla2');
    grilla.innerHTML += ` <div class="col-12 col-md-4 col-lg-3 mb-3 mx-3">
        <div class="card h-100">
          <img src="${juego.url}" class="card-img-top" alt="${juego.nombre}">
          
        </div>
      </div>`
  }
};

function crearColumnaAven(juego) {
  if (juego.publicado == true) {
    let grilla = document.getElementById('grilla3');
    grilla.innerHTML += ` <div class="col-12 col-md-4 col-lg-3 mb-3 mx-3">
        <div class="card h-100">
          <img src="${juego.url}" class="card-img-top" alt="${juego.nombre}">
          
        </div>
      </div>`
  }
};

function crearColumnaDep(juego) {
  if (juego.publicado == true) {
    let grilla = document.getElementById('grilla4');
    grilla.innerHTML += ` <div class="col-12 col-md-4 col-lg-3 mb-3 mx-3">
        <div class="card h-100">
          <img src="${juego.url}" class="card-img-top" alt="${juego.nombre}">
          
        </div>
      </div>`
  }
};

