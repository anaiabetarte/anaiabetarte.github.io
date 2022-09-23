const usuario = document.getElementById("usuario");
const pass = document.getElementById("password");
const form = document.getElementById("formulario");
let user = [];

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); 
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    /* location.href= "index2.html"; */
  }

window.addEventListener('load', ()=> {
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log("hola");
        signUp();
        validaCampos();
    })
})

let htmlContentToAppend = "Existen campos vacíos";
function validaCampos(){
    if(usuario.value <1 || pass.value < 1) {
        document.getElementById("aviso").innerHTML = htmlContentToAppend;
    } else {
        location.href = "index2.html";
    }
};
 
function signUp(){
    user.push(usuario.value)
    localStorage.setItem("user", JSON.stringify(user));
}

