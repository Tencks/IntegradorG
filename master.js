



const verificarToken = localStorage.getItem("token")

// Obtener el elemento del menú de perfil
const perfilDropdown = document.getElementById("userOptions");

//Obetener el seccion home para personalizar
const homeSection = document.getElementById('homeContainer');
    const user = JSON.parse(localStorage.getItem('userData'))


//PREDEF DATE

const fechita = new Date();
const cumple =  user.birthday;
const fechitaCumple = new Date(cumple);

const fechitaDif = fechitaCumple -  fechita;


const  homeCumple = homeSection.querySelector('#homeCumple');


function ActualizarTiempoCumple(){
    //PREDEF  MATH
const  Matematika = Math
let  seg = Matematika.floor(fechitaDif/1000);
let  min  = Matematika.floor(seg/60);
let hour = Matematika.floor(min/60);
let dias = Matematika.floor(hour/24);

let hourRest = hour % 24;
let  minRest = min % 60;
let segRest = seg % 60;

homeCumple.textContent = `Tan solo quedan ${dias} días y ${hourRest}:${minRest}:${segRest} para su cumpleaños!`;

}

// Verificar si el usuario está registrado (tiene un token de verificación)
if (verificarToken) {
  perfilDropdown.style.display = "block"; // Mostrar el elemento del menú

    document.addEventListener("DOMContentLoaded", function(){
        if (homeSection) {
            const homeTitleElement = homeSection.querySelector('#homeTitle');
              homeTitleElement.textContent = `Bienvenido ${user.username}`;
            
            const homeTitle2Element = homeSection.querySelector('#homeTitle2');
                homeTitle2Element.textContent = 'Disfrute su estadía durante el tiempo que persista.'
            const homeTextElement = homeSection.querySelector('#homeText');
                homeTextElement.textContent = 'Si lo desea puede tomarse un tiempo para conocer estas noticias.';
                if(cumple){
                    ActualizarTiempoCumple();
                }
          }
           
          
          setInterval(ActualizarTiempoCumple(), 1000);
        })
          

} else {
  perfilDropdown.style.display = "none"; // Ocultar el elemento del menú
}


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
         <mat-label>Idioma de las noticias</mat-label>
            <select class="form-select" id="Idioma">
                <option value="us">Ingles</option>
                <option value="jp">Japones</option>
                <option value="kr">Korea</option>
                <option value="it">Italiano</option>
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
    const cardBack = document.querySelectorAll(".card-background");
    const cardBorder = document.querySelectorAll(".card")
    const navbarColor = document.querySelectorAll(".navColor")

    RegularText.forEach((elemento) => {
        elemento.style.color = obtenerColorTexto(textColor, "text-regular");
      });
    
      TitleText.forEach((elemento) => {
        elemento.style.color = obtenerColorTexto(textColor, "titulo");
      });

    cardBack.forEach((elemento) =>{
        elemento.style.backgroundColor = obtenerColorTexto(textColor, "card-background")
        elemento.style.borderRadius = "10px";
    })

    cardBorder.forEach((elemento) =>{
        elemento.style.borderColor = obtenerColorTexto(textColor, "card-background")
    })

    navbarColor.forEach((elemento) =>{
        elemento.style.backgroundColor = obtenerColorTexto(textColor,"navColor")
    })
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
            if (elemento === "text-regular"){
                return "#000";
            }else if  (elemento === "titulo"){
                return "#000";
            }else if (elemento === "card-background"){
                return "#fff"
            }else if (elemento === "navColor"){
                return "#ddd"
            }
            break;
        case "claro":
            return "#fff";
            break;
        case "alto-constraste":
            if (elemento === "text-regular"){
                return "#B931FC";
            }else if  (elemento === "titulo"){
                return "#FB2576";
            }else if (elemento === "card-background"){
                return "#0002A1"
            }else if (elemento === "navColor"){
                return "#332FD0"
            }
            break;
        case "fluor":
            if (elemento === "text-regular") {
                return "#85E6C5";
              } else if (elemento === "titulo") {
                return "#33BBC5";
              }else if (elemento === "card-background"){
                return "#614BC3"
              }else if (elemento === "navColor"){
                return "#170055"
              }
            break;
        default:
            return "#000";
            break;
    }
    
}



//  MOSTRAR SECCION U OCULTARLA 

function SectionView(sectionID){
    const sectionLoad = sectionID;
        localStorage.setItem("sectionActual", sectionLoad);

    const sections = document.querySelectorAll('section');
        sections.forEach(section =>{
            section.style.display = 'none';
        });
        const sectionViewer = document.getElementById(sectionID);
            if(sectionViewer){
                sectionViewer.style.display = 'block';
            }
}

//  CORROBORA CUAL FUE LA ULTIMA SECCION ABIERTA Y LA MANTIENE AL RECARGAR 

document.addEventListener("DOMContentLoaded", function() {
    // Verificar si hay una sección almacenada en el localStorage
    const seccionGuardada = localStorage.getItem("sectionActual");
  
    if (seccionGuardada) {
      // Desplazarse a la sección guardada
      const sectionViewer = document.getElementById(seccionGuardada);
      if(sectionViewer){
          sectionViewer.style.display = 'block';
      }
    }
  });
  
