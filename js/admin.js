import {
  campoRequerido,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";


let campoCodigo = document.getElementById("codigo");
let campoNombreJuego = document.getElementById("nombreJuego");
let campoDescripcion = document.getElementById("descripcion");
let campoCategoria = document.getElementById("categoria");
let campoUrl = document.getElementById("URL");
let formularioProducto = document.querySelector("#formProduto");
let btnSubmit = document.querySelector("#btnSubmit");
let btnNuevo = document.getElementById("btnNuevo");
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let publicado = document.getElementById("publicado")
let destacado = false


let productoExistente = false; 
let listaProductos = JSON.parse(localStorage.getItem("arrayJuegos")) || [];

campoNombreJuego.addEventListener("blur", () => {
  campoRequerido(campoNombreJuego);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoUrl.addEventListener("blur", () => {
 
  validarURL(campoUrl);
});


btnSubmit.addEventListener("click", guardarProducto);
btnNuevo.addEventListener("click", cargarNumero);


cargaInicial();


function cargarNumero() {
  cleanForm();

  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  campoCodigo.value = result

}

function guardarProducto(e) {

  e.preventDefault();

  if (
    validarGeneral(
      campoNombreJuego,
      campoDescripcion,
      campoUrl
    )
  ) {

    if (productoExistente === false) {
      
      crearProducto();
    } else {
      
      modificarProducto();
    }
  }
}

function crearProducto() {

  let productoNuevo = new Producto(
    campoCodigo.value,
    campoNombreJuego.value,
    campoCategoria.value,
    campoDescripcion.value,
    campoUrl.value,
    publicado.checked,
    destacado
  );

 

  listaProductos.push(productoNuevo);


  limpiarFormulario();

  guardarLocalStorage();

  Swal.fire(
    "Producto creado!",
    "Su producto fue creado correctamente",
    "success"
  );
  //cargar el/los productos en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {

  formularioProducto.reset();

  campoNombreJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoUrl.className = "form-control";

  myModal.hide();


  productoExistente = false;
}

function cleanForm() {
  formularioProducto.reset();

  campoNombreJuego.className = "form-control";
  campoDescripcion.className = "form-control";
  campoUrl.className = "form-control";

  
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayJuegos", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.querySelector("#tablaProducto");
  
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
    
   
    if (existeDestacado != undefined && row.firstElementChild.textContent == existeDestacado.codigo) {
      row.className = 'green'
    }
  })

}

function cargaInicial() {
  if (listaProductos.length > 0) {
    
    listaProductos.map((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}

window.prepararEdicionProducto = function (codigo) {
 

  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === codigo;
  });
 
 
  campoCodigo.value = productoBuscado.codigo;
  campoNombreJuego.value = productoBuscado.nombre;
  campoCategoria.value = productoBuscado.categoria;
  campoDescripcion.value = productoBuscado.descripcion;
  campoUrl.value = productoBuscado.url;
  publicado.checked = productoBuscado.publicado

  
  productoExistente = true;
};

function modificarProducto() {
  
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
      
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === campoCodigo.value;
      });

     
      listaProductos[indiceProducto].nombre = campoNombreJuego.value;
      listaProductos[indiceProducto].categoria = campoCategoria.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].url = campoUrl.value;
      listaProductos[indiceProducto].publicado = publicado.checked;

     
      guardarLocalStorage();
 
      borrarTabla();
      cargaInicial();
     
      Swal.fire(
        "Producto modificado!",
        "Su producto fue modificado correctamente",
        "success"
      );
     
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

window.borrarProducto = function (codigo) {
 
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
      
      let nuevaListaProducto = listaProductos.filter((itemProducto) => {
        return itemProducto.codigo !== codigo;
      });

    
    
      listaProductos = nuevaListaProducto;
      guardarLocalStorage();

     
      borrarTabla();
      cargaInicial();

      
      Swal.fire(
        "Producto eliminado!",
        "Su producto fue eliminado correctamente",
        "success"
      );
    }
  });
};

window.destacado = function (codigo) {
 

  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === codigo;
  });

  let existeDestacado = listaProductos.find((itemProducto) => {
    return itemProducto.destacado === true;
  });


  let getTRs = document.querySelectorAll('tr')

  getTRs.forEach(function (row) {
    
   
    if (row.firstElementChild.textContent == productoBuscado.codigo && existeDestacado == undefined) {
      row.className = 'green'

      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === productoBuscado.codigo;
      });

      listaProductos[indiceProducto].destacado = true;
    
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
      
      getPrevio.className = "white"
  
      if (row.firstElementChild.textContent == productoBuscado.codigo) {
       
        row.className = 'green'
      }

      guardarLocalStorage();
      borrarTabla();
      cargaInicial();
      return;
     
  
    }
  })

}
