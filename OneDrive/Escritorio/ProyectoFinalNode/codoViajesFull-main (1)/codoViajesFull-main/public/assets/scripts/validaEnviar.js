const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputCelular = document.getElementById("celular");
const cbox1 = document.getElementById("cbox1");
const cbox2 = document.getElementById("cbox2");
const enviar = document.getElementById("submit");
const formatoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,5}$/;

if(!inputNombre.value || !inputEmail.value || !inputCelular.value){
    {
        enviar.style.backgroundColor="#222";
        enviar.style.color="#fff";
        enviar.disabled=true;        
    }
}
function validaEnviar() {
    if (inputNombre.value.length > 0 && inputNombre.value.length < 30
        && inputCelular.value
        && inputEmail.value
        && formatoEmail.test(inputEmail.value)
        && (cbox1.checked || cbox2.checked)) {
        enviar.style.backgroundColor = "#e8dd10";
        enviar.style.color = "#222";
        enviar.disabled = false;
    } else {
        enviar.style.backgroundColor = "#222";
        enviar.style.color = "#fff";
        enviar.disabled = true;
    }
}
