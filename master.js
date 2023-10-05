


function Options(){

    const contentHtml = `
    <p>
        Aqui puedes modificar el color de fondo y más
    </p>
    <br>

        <form id="Config">

        <div class="col">
             <mat-label>Color de fondo</mat-label>
          <select class="form-select" id="FondoColor">
                 <option value="blanco">Blanco</option>
                 <option value="negro">Negro</option>
                 <option value="violeta">Violeta</option>
                 <option value="sorpresa">Sorpresa</option>
          </select>
        </div>

        <hr class="mx-n3">

        <div class="col">
          <mat-label>Color de Textos</mat-label>
         <select class="form-select" id="TextColor">
             <option value="normal">Normal</option>
              <option value="claro">Claro</option>
             <option value="alto-constraste">Alto Constraste</option>
             <option value="fluor">Fluor</option>
         </select>
        </div>

        <hr class="mx-n3">

        <div class="col">
         <mat-label>Idioma</mat-label>
            <select class="form-select" id="Idioma">
                <option value="es">Español</option>
                <option value="en">Ingles</option>
                <option value="ja">Japones</option>
            </select>
        </div>

      <hr class="mx-n3">

        </form> 
    `;

    Swal.fire({
        title: 'Configuraciones',
        icon: 'info',
        html:
         contentHtml,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Confirmar',
        cancelButtonText:
          'Cancelar',
        
      }).then((result) =>{
        if (result.isConfirmed) {

                // Obtengo los valores seleccionados y los almaceno en local
                const fondoColor = document.getElementById("FondoColor").value;
                 localStorage.setItem("fondoColor",fondoColor);
                
                 const textColor = document.getElementById("TextColor").value;
                    localStorage.setItem("textColor",textColor);


                const idioma = document.getElementById("Idioma").value;
                localStorage.setItem("idioma",idioma);

            
                // Aplicamos los cambioss
                document.body.style.backgroundColor = obtenerColorFondo(fondoColor);
                document.body.style.color = obtenerColorTexto(textColor);
                
                setTextStyle(textColor);

        }
      })
}

function setTextStyle(textColor){
    const RegularText = document.querySelectorAll(".text-regular");
    const TitleText = document.querySelectorAll(".titulo");

    RegularText.forEach((elemento) => {
        elemento.style.color = obtenerColorTexto(textColor, "text-regular");
      });
    
      TitleText.forEach((elemento) => {
        elemento.style.color = obtenerColorTexto(textColor, "titulo");
      });
}

function obtenerColorFondo(fondoColor){
    switch(fondoColor){
        case "blanco":
            return "white";
            break;
        case "negro":
            return "#000";
            break;
        case "violeta":
            return "#573157";
            break;
        case "sorpresa":
            return "#b5f238";
            break;
        default:
            return "#fff";
            break;
    }

}

function obtenerColorTexto(textColor, elemento){
    switch(textColor){
        case "normal":
            return "#000";
            break;
        case "claro":
            return "#fff";
            break;
        case "alto-constraste":
            if (elemento === "text-regular"){
                return "#40E0D0";
            }else if  (elemento === "titulo"){
                return "#FF69B4";
            }
            break;
        case "fluor":
            if (elemento === "text-regular") {
                return "#ffcc00";
              } else if (elemento === "titulo") {
                return "#00ff00";
              }
            break;
        default:
            return "#000";
            break;
    }
    
}



// NAVEGACION O RUTEO 

function HomeNav(){
    const homeElement = document.getElementById("home");
        if(homeElement){
            homeElement.scrollIntoView({behavior:"smooth"});
        }
}

function LoginNav(){
    const loginElement = document.getElementById("login");
        if(loginElement){
            loginElement.scrollIntoView({behavior:"smooth"});
        }
}
function PerfilNav(){
    const perfilElement = document.getElementById("perfil");
        if(perfilElement){
            perfilElement.scrollIntoView({behavior:"smooth"});
        }
}
function UpdatePerfilNav(){
    const updatePerfilElement = document.getElementById("updatePerfil");
        if(updatePerfilElement){
            updatePerfilElement.scrollIntoView({behavior:"smooth"});
        }
}

// FIN NAVEGACION O RUTEO 