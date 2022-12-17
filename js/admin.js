import {
  campoRequerido,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
//console.log(campoCodigo);
let campoNombreJuego = document.getElementById("nombreJuego");
let campoDescripcion = document.getElementById("descripcion");
let campoCategoria = document.getElementById("categoria");
let campoUrl = document.getElementById("URL");
let formularioProducto = document.querySelector("#formProduto");
let btnSubmit = document.querySelector("#btnSubmit");
let btnDatosPrueba = document.getElementById("btnDatosPrueba");
let btnNuevo = document.getElementById("btnNuevo");
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let publicado = document.getElementById("publicado")
let destacado = false


let productoExistente = false; //variable bandera: si es false quiere crear producto y si true quiero modicar Producto
//Si hay productos en localstorage, quiero guardar en el array de productos y si no que sea un array vacio.
let listaProductos = JSON.parse(localStorage.getItem("arrayJuegos")) || [];

//asociar un evento a cada elemento obtenido

campoNombreJuego.addEventListener("blur", () => {
  campoRequerido(campoNombreJuego);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoUrl.addEventListener("blur", () => {
  console.log("desde url");
  validarURL(campoUrl);
});


btnSubmit.addEventListener("click", guardarProducto);
btnNuevo.addEventListener("click", cargarNumero);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba);

//invoco a cargaInicial: si tengo productos en el localStorage los mustra en la tabla.
cargaInicial();

//empieza la lógica del crud

function cargarNumero() {
  cleanForm();

  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  campoCodigo.value = result

}

function guardarProducto(e) {
  //prevenir el actualizar del submit
  e.preventDefault();
  //verificar que todos los datos sean validos
  if (
    validarGeneral(
      campoNombreJuego,
      campoDescripcion,
      campoUrl
    )
  ) {
    // console.log("los datos fueron enviados correctamente");
    if (productoExistente === false) {
      //crear producto
      crearProducto();
    } else {
      //modificar producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crarCodigoUnico() función que retorna un código único ---> codUnico
  //crear un objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoNombreJuego.value,
    campoCategoria.value,
    campoDescripcion.value,
    campoUrl.value,
    publicado.checked,
    destacado
  );

  console.log(`El valor de publicado es ${publicado.checked}`);
  console.log(productoNuevo);
  //guardar cada objeto (producto) en un array de productos
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //limpiar formulario
  limpiarFormulario();
  //guardar el array de productos dentro de localStorage
  guardarLocalStorage();
  //mostrar un cartel al usuario
  Swal.fire(
    "Producto creado!",
    "Su producto fue creado correctamente",
    "success"
  );
  //cargar el/los productos en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value del formulario
  formularioProducto.reset();
  //resetear las clases de los input
  campoNombreJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoUrl.className = "form-control";

  myModal.hide();

  //resetear la variable bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}

function cleanForm() {
  formularioProducto.reset();

  campoNombreJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoUrl.className = "form-control";

  //resetear la variable bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayJuegos", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.querySelector("#tablaProducto");
  //se usa el operador de asiganción de adición para concatenar con las filas que ya tengo
  tablaProducto.innerHTML += `<tr> 
  <th>${producto.codigo}</th>
  <td>${producto.nombre}</td>
  <td>${producto.categoria}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.url}</td>
  <td>${producto.publicado}</td>
  <td>
    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="prepararEdicionProducto('${producto.codigo}')">Editar</button>
    <button class="btn btn-danger" onclick='borrarProducto("${producto.codigo}")'>Borrar</button>
    <button class="btn btn-success" onclick='destacado("${producto.codigo}")'>&#9733</button> 
 </td>
</tr>`;

  let existeDestacado = listaProductos.find((itemProducto) => {
    return itemProducto.destacado === true;
  });

  let getTRs = document.querySelectorAll('tr')

  getTRs.forEach(function (row) {
    console.log(row)
    console.log(row.firstElementChild.textContent)
    //Low
    if (existeDestacado != undefined && row.firstElementChild.textContent == existeDestacado.codigo) {
      row.className = 'green'
    }
  })

}

function cargaInicial() {
  if (listaProductos.length > 0) {
    //crear filas
    //listaProductos.forEach((itemProducto) => {crearFila(itemProducto);});
    listaProductos.map((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}

window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  //buscar el producto en el array
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === codigo;
  });
  console.log(productoBuscado);
  //mostrar el producto en el formulario de Producto
  campoCodigo.value = productoBuscado.codigo;
  campoNombreJuego.value = productoBuscado.nombre;
  campoCategoria.value = productoBuscado.categoria;
  campoDescripcion.value = productoBuscado.descripcion;
  campoUrl.value = productoBuscado.url;
  publicado.checked = productoBuscado.publicado

  //cambiar la variable bandera productoExistente
  productoExistente = true;
};

function modificarProducto() {
  console.log("desde modificar producto");
  Swal.fire({
    title: "¿Seguro qué desea modificar este producto?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento que quiero modificar dentro del array de productos
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === campoCodigo.value;
      });

      console.log(indiceProducto);
      //modificar los valores dentro del elemento del array de productos
      listaProductos[indiceProducto].nombre = campoNombreJuego.value;
      listaProductos[indiceProducto].categoria = campoCategoria.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].url = campoUrl.value;
      listaProductos[indiceProducto].publicado = publicado.checked;

      //actualizar el localStorage
      guardarLocalStorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      //mostrar cartel al usuario
      Swal.fire(
        "Producto modificado!",
        "Su producto fue modificado correctamente",
        "success"
      );
      //limpiar el formulario
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

window.borrarProducto = function (codigo) {
  console.log("desde borrar producto");
  console.log(codigo);
  Swal.fire({
    title: "¿Seguro qué desea borrar este producto?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento en el array y borrarlo
      //opcion 1 encontrar el indice con findIndex y usar splice(indice,1);
      //opcion 2 usando filter
      let nuevaListaProducto = listaProductos.filter((itemProducto) => {
        return itemProducto.codigo !== codigo;
      });

      console.log(nuevaListaProducto);
      //actualizar el arreglo original y el localStorage
      listaProductos = nuevaListaProducto;
      guardarLocalStorage();

      //actualizar la tabla
      borrarTabla();
      cargaInicial();

      //mostrar cartel al usuario
      Swal.fire(
        "Producto eliminado!",
        "Su producto fue eliminado correctamente",
        "success"
      );
    }
  });
};

window.destacado = function (codigo) {
  console.log("desde destacado")
  console.log(listaProductos)

  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === codigo;
  });

  let existeDestacado = listaProductos.find((itemProducto) => {
    return itemProducto.destacado === true;
  });
  console.log(productoBuscado);

  let getTRs = document.querySelectorAll('tr')

  getTRs.forEach(function (row) {
    console.log(row)
    console.log(row.firstElementChild.textContent)
    //Low
    if (row.firstElementChild.textContent == productoBuscado.codigo && existeDestacado == undefined) {
      row.className = 'green'

      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === productoBuscado.codigo;
      });

      listaProductos[indiceProducto].destacado = true;
      //actualizar el localStorage
      guardarLocalStorage();
      existeDestacado = listaProductos.find((itemProducto) => {
        return itemProducto.destacado === true;
      });
      borrarTabla();
      cargaInicial();
      return;
    }
  })

  getTRs.forEach(function (row) {
    console.log("desde row", row)
    console.log(row.firstElementChild.textContent)
    //Low
    if (existeDestacado.codigo != codigo) {

      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === productoBuscado.codigo;
      });
      let indiceProductoPrevio = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === existeDestacado.codigo;
      });
      listaProductos[indiceProducto].destacado = true;
      listaProductos[indiceProductoPrevio].destacado = false;
  
      let getPrevio = document.getElementsByClassName("green")[0]
      console.log("TEST", getPrevio)
      getPrevio.className = "white"
  
      if (row.firstElementChild.textContent == productoBuscado.codigo) {
        console.log("CODIGO", row.firstElementChild.textContent)
        row.className = 'green'
      }

      guardarLocalStorage();
      borrarTabla();
      cargaInicial();
      return;
     
  
    }
  })

}


function cargarDatosPrueba() {
  const datos = [
    {
      codigo: "994",
      producto: "Kakashi Hatake (Anbu)",
      cantidad: "1",
      descripcion:
        "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
      url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
    },
    {
      codigo: "933",
      producto: "Shikamaru Nara",
      cantidad: "1",
      descripcion: "Naruto shippuden",
      url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
    },
    {
      codigo: "184",
      producto: "Tobi",
      cantidad: "1",
      descripcion:
        "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
      url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
    },
    {
      codigo: "729",
      producto: "Orochimaru",
      cantidad: "1",
      descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
      url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
    },
    {
      codigo: "073",
      producto: "Jiraiya On Toad",
      cantidad: "1",
      descripcion:
        "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
      url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
    },
    {
      codigo: "728",
      producto: "Gaara ",
      cantidad: "1",
      descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
      url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
    },
    {
      codigo: "182",
      producto: "Kakashi Figure",
      cantidad: "1",
      descripcion:
        'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
      url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
    },
  ];

  if (!localStorage.getItem('arrayJuegos')) {
    // quiero agregar los datos de productos
    console.log('cargar datos prueba');
    localStorage.setItem('arrayJuegos', JSON.stringify(datos));
    listaProductos = datos;
    //mostar en la tabla
    listaProductos.forEach(itemProducto => {
      crearFila(itemProducto);
    })
  }
};