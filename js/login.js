import {
    campoRequerido,
    validarLogin,
} from "./validaciones.js";

let campoUsuario = document.getElementById("usuario");
let campoContrasenia = document.getElementById("contrasenia");
let formularioUsuario = document.querySelector("#formUser");
let olvClave = document.getElementById("olvClave");
olvClave.addEventListener("click", restaurarClave);

let btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", validarUsuario);


let listaUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];

campoUsuario.addEventListener("blur", () => {
    campoRequerido(campoUsuario);
});

campoContrasenia.addEventListener("blur", () => {
    campoRequerido(campoContrasenia);
});

function restaurarClave(){

    if(campoUsuario.value.trim().length > 0){
        var templateParams = {
            user_name: campoUsuario.value.trim(),
            destinatario: "ruiz.e.642@gmail.com"
        };
    
        emailjs.send('service_wr59yeh', 'template_xkb62r9', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                limpiarFormulario();
                Swal.fire(
                    "Reseteo de clave enviado",
                    "Espera que el administrador resetee tu clave",
                    "success"
                );
            }, function (error) {
                console.log('FAILED...', error);
            });
    } else{
        Swal.fire(
            "Algo salio mal!",
            "Ingresa tu nombre de usuario",
            "error"
        );
    }

    
}

function validarUsuario(e) {

    e.preventDefault();

    if (validarLogin(campoUsuario, campoContrasenia)) {
        let usuario = listaUsuarios.find((user) => {
            return user.usuario === campoUsuario.value;
        });

        console.log(usuario)

        if (usuario != undefined && usuario.contrasenia === campoContrasenia.value) {
            // Swal.fire(
            //     "Bienvenido",
            //     `Hola ${usuario.usuario}`,
            //     "success"
            // );

            if (usuario.usuario === "admin") {
                location.replace("./admin.html")
            } else {
                let usuarioLogueado = []
                usuarioLogueado.push({ nombre: `${usuario.usuario}` });
                localStorage.setItem("arrayLogueado", JSON.stringify(usuarioLogueado));
                location.replace("./index.html")
            }




        } else {
            Swal.fire(
                "Algo salio mal!",
                "Verifica tus credenciales",
                "error"
            );
        }

    } else {
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

}