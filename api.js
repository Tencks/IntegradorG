
const apiKey = '62d9b372599449c397e41753beabff98';
const countryKey = localStorage.getItem('idioma');

const colorTexto =  localStorage.getItem('textColor');
const colorFondo = localStorage.getItem('fondoColor');

const token = localStorage.getItem('token');

function getMusicNews(){
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${countryKey}&category=music&apiKey=${apiKey}`;
    const noticiasContainer = document.getElementById('noticias');
        

    fetch(apiUrl)
        .then((response) => response.json())
        .then ((data) =>{
            if (data.articles && Array.isArray(data.articles)) {
                const noticias = data.articles;

                const noticiasCard = document.getElementById('noticiasCard');


                noticias.forEach((noticia) => {
                    const titulo = noticia.title;
                    const descripcion = noticia.description;
                    const urlNotice = noticia.url;
                    const autor = noticia.author;
                    const Img = noticia.urlToImage;

                    console.log(noticia)

                        // Clonar el elemento card y agregarlo al contenedor
                        const noticiaDiv = noticiasCard.cloneNode(true);

                    const noticiasTitle = document.querySelector('#noticiasTitle');
                        noticiasTitle.textContent = titulo;
                        
                    const  noticiaImg = document.querySelector('#noticiasImg');
                        noticiaImg.src = Img;

                    const noticiasDescription = document.querySelector('#noticiasDescription');
                        noticiasDescription.textContent = descripcion;

                    const noticiasAutor = document.querySelector('#noticiasAutor');
                        noticiasAutor.textContent = `Autor: ${autor}`;
                        
                    const noticiasUrl = document.querySelector('#noticiasUrl');
                        noticiasUrl.textContent = 'Leer más';
                        noticiasUrl.href = urlNotice;

                        

                    noticiasContainer.appendChild(noticiaDiv);
                    

                });
            } else {
                console.error('La respuesta del API no tiene artículos válidos');
            }


        })
        .catch((error) =>{
            console.log('Fallo la obtención de noticias: ',error)
        })
}


if (token){
    document.addEventListener('DOMContentLoaded', getMusicNews)
}else{
    console.log('no se ha encontrado un token válido para mostrar las noticias')
}
