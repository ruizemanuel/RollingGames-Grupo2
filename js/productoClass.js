export class Producto{
    constructor(parametroCodigo, parametroNombre, parametroCategoria,parametroDescripcion, parametroUrl, parametroPublicado, parametroDestacado){
        this.codigo = parametroCodigo;
        this.nombre = parametroNombre;
        this.categoria = parametroCategoria;
        this.descripcion = parametroDescripcion;
        this.url = parametroUrl;
        this.publicado = parametroPublicado;
        this.destacado = parametroDestacado;
    }

    //getters y setters
     get mostrarCodigo() {
        return this.codigo;
     }

     get mostrarNombre() {
        return this.nombre;
     }

     get mostrarCategoria() {
      return this.categoria;
   }

     get mostrarDescripcion() {
        return this.descripcion;
     }

     get mostrarUrl() {
        return this.url;
     }

     get mostrarPublicado() {
      return this.publicado
     }

     get mostrarDestacado() {
      return this.destacado
     }

     set modificarCodigo(codigo) {
        this.codigo = codigo;
     }

     set modificarNombre(nombre) {
        this.nombre = nombre;
     }

     set modificarCategoria(categoria) {
      this.categoria = categoria;
   }

     set modificarDescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
     }
     
     set modificarUrl(url) {
        this.url = url;
     }

     set modificarPublicado(publicado) {
      this.publicado = publicado;
   }

   set modificarDestacado(destacado) {
      this.destacado = destacado;
   }


};