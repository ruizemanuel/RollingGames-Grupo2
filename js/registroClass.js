export class Registro{
    constructor(parametroUsuario, parametroContrasenia){
        this.usuario = parametroUsuario;
        this.contrasenia = parametroContrasenia;
        
    }

    //getters y setters
     get mostrarUsuario() {
        return this.usuario;
     }

     get mostrarContrasenia() {
        return this.contrasenia;
     }


     set modificarUsuario(usuario) {
        this.usuario = usuario;
     }

     set modificarContrasenia(contrasenia) {
        this.contrasenia = contrasenia;
     }



};