//validaciones
export const campoRequerido = (input) => {
  
  if (input.value.trim().length > 0) {
    
    input.className = "form-control is-valid";
    return true;
  } else {
    
    input.className = "form-control is-invalid";
    return false;
  }
};


const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarGeneral = (
  campoNombreJuego,
  campoDescripcion,
  campoUrl
) => {
 
  let alerta = document.querySelector("#mjeAlerta");
  if (
    campoRequerido(campoNombreJuego) &&
    campoRequerido(campoDescripcion) &&
    validarURL(campoUrl)
  ) {
    
    alerta.className = "alert alert-danger mt-4 d-none";
    return true;
  } else {
    
    alerta.className = "alert alert-danger mt-4";
    return false;
  }
};

const validarRegistro = (
  campoUsuario,
  campoContrasenia,
  campoContrasenia2
) => {
 
  let alerta = document.querySelector("#mjeAlerta");
  if (
    campoRequerido(campoUsuario) &&
    campoRequerido(campoContrasenia) &&
    campoRequerido(campoContrasenia2)
  ) {
    
    alerta.className = "alert alert-danger mt-4 d-none";
    return true;
  } else {
    
    alerta.className = "alert alert-danger mt-4";
    return false;
  }
};

const validarLogin = (
  campoUsuario,
  campoContrasenia
) => {
 
  let alerta = document.querySelector("#mjeAlerta");
  if (
    campoRequerido(campoUsuario) &&
    campoRequerido(campoContrasenia)
  ) {
    
    alerta.className = "alert alert-danger mt-4 d-none";
    return true;
  } else {
    
    alerta.className = "alert alert-danger mt-4";
    return false;
  }
};

export { validarURL, validarGeneral, validarRegistro, validarLogin };
