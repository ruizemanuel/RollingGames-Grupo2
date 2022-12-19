import {
    campoRequerido,
    validarRegistro,
} from "./validaciones.js";
import { Registro } from "./registroClass.js";

let campoUsuario = document.getElementById("usuario");
let campoContrasenia = document.getElementById("contrasenia");
let campoContrasenia2 = document.getElementById("contrasenia2");
let formularioUsuario = document.querySelector("#formUser");

let btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", guardarUsuario);


let listaUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];

campoUsuario.addEventListener("blur", () => {
    campoRequerido(campoUsuario);
});

campoContrasenia.addEventListener("blur", () => {
    campoRequerido(campoContrasenia);
});

campoContrasenia2.addEventListener("blur", () => {
    campoRequerido(campoContrasenia2);
});

function guardarUsuario(e) {

    e.preventDefault();

    if (validarRegistro(campoUsuario, campoContrasenia, campoContrasenia2) && campoContrasenia.value === campoContrasenia2.value) 
    {
        crearUsuario();

    } else{
        Swal.fire(
            "Algo salio mal!",
            "Verifica que las claves coincidan",
            "error"
        );
    }
}

function crearUsuario() {

    let usuarioNuevo = new Registro(
        campoUsuario.value,
        campoContrasenia.value,

    );



    listaUsuarios.push(usuarioNuevo);


    limpiarFormulario();

    guardarLocalStorage();

    Swal.fire(
        "Usuario creado!",
        "Su usuario fue creado correctamente",
        "success"
    );

}


function guardarLocalStorage() {
    localStorage.setItem("arrayUsuarios", JSON.stringify(listaUsuarios));
}

function limpiarFormulario() {

    formularioUsuario.reset();
  
    campoUsuario.className = "form-control";
    campoContrasenia.className = "form-control";
    campoContrasenia2.className = "form-control";
    
  }