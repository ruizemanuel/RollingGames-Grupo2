let templateParams = {
  from_name: "Rolling Games",
  user_name: "Federico Soria",
  destinatario: "lfede.soria@gmail.com",
  message: "Gracias por haberte contactado con nosotros",
};

function enviarMail() {
  emailjs.send("service_470nr1h", "template_q5eze0c", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

let correo = document.querySelector("#correo");
let areaTexto = document.querySelector("#areaTexto");

areaTexto.addEventListener("blur", () => {
    validarTexto(areaTexto)
})

correo.addEventListener("blur", () => {
  validarCorreo(correo);
});


const validarCorreo = (input) => {
  let expReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (expReg.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    }else {
        input.className = "form-control is-invalid";
        return false;
    }
};


const validarTexto = (textarea) => {
    if (textarea.value.trim().length > 0) {
        textarea.className = "form-control is-valid";
        return true;
    }else {
        textarea.className = "form-control is-invalid";
        return false;
    }
}