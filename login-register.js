var Usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function generateRandomToken(length) {
    const tokenArray = new Uint8Array(length / 2); // Creamos un arreglo de bytes de la mitad del tamaño deseado (cada byte representa dos caracteres hexadecimales)
    crypto.getRandomValues(tokenArray); // Llenamos el arreglo con valores aleatorios
  
    // Convertimos los bytes en una cadena hexadecimal
    const token = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');
  
    return token;
  }
  
  // Llamar a la función para generar un token aleatorio de 16 caracteres (puedes ajustar la longitud según tus necesidades)
  const randomToken = generateRandomToken(16);
  
  


let registerForm = document.getElementById("register");

registerForm.addEventListener("submit", function (event){
    event.preventDefault();

    ///Obtener los valores del formulario
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

        if(password && confirmPassword){
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
            const isPasswordValid =
              password.length >= 8 && passwordPattern.test(password.toString());
                if(!isPasswordValid){
                    Swal.fire({
                        title: 'Creación del usuario',
                        icon: 'warning',
                        html:
                        'La contraseña debe tener al menos 8 caracteres y contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número.',
                        focusConfirm: false,
                        confirmButtonText:
                          'Confirmar',
                      })
                    return;
                }
                if(password !== confirmPassword){
                    Swal.fire({
                        title: 'Creación del usuario',
                        icon: 'warning',
                        html:
                         `No se ha podido crear el usuario ya que las contraseñas no coinciden, vuelva a intentarlo`,
                        focusConfirm: false,
                        confirmButtonText:
                          'Confirmar',
                      })
                    return;
                }
        }else{
                Swal.fire({
                    title: 'Creación del usuario',
                    icon: 'warning',
                    html:
                     `No se ha podido crear el usuario ya que las contraseñas no coinciden, vuelva a intentarlo`,
                    focusConfirm: false,
                    confirmButtonText:
                      'Confirmar',
                  })
                return;
        }
        
        if(email){
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValid = emailPattern.test(email);
            if(!emailValid){
                Swal.fire({
                    title: 'Creación del usuario',
                    icon: 'warning',
                    html:
                    'No se ha podido crear el usuario ya que el correo no es válido, por favor vuelva a intentarlo con un correo válido.',
                    focusConfirm: false,
                    confirmButtonText:
                      'Confirmar',
                  })
                return;
            }
         
        }

    
    const userId = Usuarios.length + 1;
    const usuario = {
        id:userId,
        username,
        email,
        password,
        numCelular : null,
        direccion: null,
        birthday: null,
        fotoUser: null,
    }



    // Cargar el usuario al array 
    Usuarios.push(usuario);

    // registerForm.reset();

    console.log('Usuario registrado :', usuario )


    //Alerta donde se avisa que se cargo con éxito
    Swal.fire({
        title: 'Creación del usuario',
        icon: 'success',
        html:
         `Se ha creado con éxito el nuevo registro del usuario : ${username}`,
        focusConfirm: false,
        confirmButtonText:
          'Confirmar',
      }).then((result) =>{
        if(result.isConfirmed){
            
        //guardado en localStorage 
        localStorage.setItem("usuarios", JSON.stringify(Usuarios));
            const saveUsers = JSON.parse(localStorage.getItem("usuarios"));
                if(saveUsers){
                //Si ya hay los recuperamos
                Usuarios = saveUsers;
            }      


            const loginElement = document.getElementById("login");
            if(loginElement){
                loginElement.scrollIntoView({behavior:"smooth"});
            }

    }
      })


});

////////////// LOGICA DEL LOGIN /////////////////

const loginForm = document.getElementById("formLogin");

loginForm.addEventListener("submit", function (event){
    event.preventDefault();

    const userID = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;

    const userHere = Usuarios.find (user => user.username === userID && user.password === password);
    

        if(userHere){
            const token = generateRandomToken(16);
            localStorage.setItem("token",token);


 

            console.log(token);

            loginForm.reset();


            Swal.fire({
                title: 'Inicio de sesion',
                icon: 'success',
                html:
                 `Las credenciales son correctas! Ahora seras redirigido al Panel de Usuario`,
                focusConfirm: false,
                confirmButtonText:
                  'Confirmar',
              }).then((result) =>{
                if(result.isConfirmed){
                    location.reload();
                    SectionView('perfil');
                    localStorage.setItem("userData", JSON.stringify(userHere));
            }
              })


        }else{
            Swal.fire({
                title: 'Inicio de sesion',
                icon: 'warning',
                html:
                 `Las credenciales de inicio no son correctas, vuelva a intentarlo`,
                focusConfirm: false,
                confirmButtonText:
                  'Confirmar',
              }).then((result) =>{
                if(result.isConfirmed){
                    loginForm.reset();
            }
              })
        }

});


///////// DESCONECTARSEE //////////

function onLogout(){
    const token = localStorage.getItem('token');
    if (token){
        localStorage.removeItem('token');
    }

    SectionView('home');
    location.reload();
}
  



function OnRegisterButton(){
    const registroElement = document.getElementById("registro");
        if(registroElement){
            registroElement.scrollIntoView({behavior:"smooth"});
        }
};

function OnLoginButton(){
    const registroElement = document.getElementById("login");
        if(registroElement){
            registroElement.scrollIntoView({behavior:"smooth"});
        }
};



////////////// PANEL DEL USUARIO /////////

document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar los datos del usuario desde el localStorage
    function loadUserData() {
      const userFromStorage = JSON.parse(localStorage.getItem("userData"));
  
      if (userFromStorage) {
        document.querySelector(".user-name").textContent = userFromStorage.username;
        document.querySelector(".user-email").textContent = userFromStorage.email;
        document.querySelector("#fullName").value = userFromStorage.username;
        document.querySelector("#eMail").value = userFromStorage.email;
        document.querySelector("#phone").value = userFromStorage.numCelular;
        document.querySelector("#adress").value = userFromStorage.direccion;
        document.querySelector("#birthday").value = userFromStorage.birthday;
  
        // Si userFromStorage.fotoUser es una URL válida, establece la imagen
        if (userFromStorage.fotoUser) {
          document.querySelector("#fotoUser").src = userFromStorage.fotoUser;
        }else{
          document.querySelector("#fotoUser").src ="https://bootdey.com/img/Content/avatar/avatar7.png";
        }
      }

    }
  
    // Carga los datos del usuario cuando se inicie la página
    loadUserData();
  });

  
  ///////////// EDITAR PANEL DEL USUARIO //////////////////

  // Obtener el formulario de actualización por su ID
const updatePerfilForm = document.getElementById("updatePerfil");

// Agregar un manejador de evento para la presentación del formulario
updatePerfilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const updatedData = {
    direccion: updatePerfilForm.querySelector('input[formControlName="direccion"]').value,
    numCelular: updatePerfilForm.querySelector('input[formControlName="numCelular"]').value,
    descriptionUser: updatePerfilForm.querySelector('textarea[formControlName="descriptionUser"]').value,
    username: updatePerfilForm.querySelector('input[formControlName="username"]').value,
    password: updatePerfilForm.querySelector('input[formControlName="password"]').value,
    birthday: updatePerfilForm.querySelector('input[formControlName="birthday"]').value,
    email: updatePerfilForm.querySelector('input[formControlName="email"]').value,
    fotoUser: updatePerfilForm.querySelector('input[formControlName="fotoUser"]').value,
  };

  // Actualizar los datos del usuario en el localStorage
  localStorage.setItem("userData", JSON.stringify(updatedData));

  Swal.fire({
    title: 'Actualizar Datos',
    icon: 'success',
    html:
     `Los datos del usuario fueron actualizados con éxito`,
    focusConfirm: false,
    confirmButtonText:
      'Confirmar',
  }).then((result) =>{
    if(result.isConfirmed){
        location.reload();
        SectionView('perfil');
}
  })
});

// Obtener los datos del usuario desde el localStorage
const userDataJSON = localStorage.getItem("userData");
if (userDataJSON) {
  // Si existen datos de usuario en el localStorage, cargarlos en el formulario
  const userData = JSON.parse(userDataJSON);

  // Rellenar el formulario con los datos del usuario
  updatePerfilForm.querySelector('input[formControlName="direccion"]').value = userData.direccion || "";
  updatePerfilForm.querySelector('input[formControlName="numCelular"]').value = userData.numCelular || "";
  updatePerfilForm.querySelector('textarea[formControlName="descriptionUser"]').value = userData.descriptionUser || "";
  updatePerfilForm.querySelector('input[formControlName="username"]').value = userData.username || "";
  updatePerfilForm.querySelector('input[formControlName="password"]').value = userData.password || "";
  updatePerfilForm.querySelector('input[formControlName="birthday"]').value = userData.birthday || "";
  updatePerfilForm.querySelector('input[formControlName="email"]').value = userData.email || "";
  updatePerfilForm.querySelector('input[formControlName="fotoUser"]').value = userData.fotoUser || "";
}
