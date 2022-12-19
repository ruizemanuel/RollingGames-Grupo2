import {
    campoRequerido,
    validarLogin,
} from "./validaciones.js";

let campoUsuario = document.getElementById("usuario");
let campoContrasenia = document.getElementById("contrasenia");
let formularioUsuario = document.querySelector("#formUser");

let btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", validarUsuario);


let listaUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];

campoUsuario.addEventListener("blur", () => {
    campoRequerido(campoUsuario);
});

campoContrasenia.addEventListener("blur", () => {
    campoRequerido(campoContrasenia);
});


function validarUsuario(e) {

    e.preventDefault();

    if (validarLogin(campoUsuario, campoContrasenia)) 
    {
        let usuario = listaUsuarios.find((user) => {
            return user.usuario === campoUsuario.value;
          });

          console.log(usuario)

          if(usuario != undefined && usuario.contrasenia === campoContrasenia.value){
            // Swal.fire(
            //     "Bienvenido",
            //     `Hola ${usuario.usuario}`,
            //     "success"
            // );
            location.replace("./index.html")


          } else{
            Swal.fire(
                "Algo salio mal!",
                "Verifica tus credenciales",
                "error"
            );
          }

    } else{
        Swal.fire(
            "Algo salio mal!",
            "Verifica tus credenciales",
            "error"
        );
    }
}


function limpiarFormulario() {

    formularioUsuario.reset();
  
    campoUsuario.className = "form-control";
    campoContrasenia.className = "form-control";
    campoContrasenia2.className = "form-control";
    
  }