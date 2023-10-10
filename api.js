const apiKey = '62d9b372599449c397e41753beabff98';
const countryKey = localStorage.getItem('idioma');
const apiUrl = `https://newsapi.org/v2/top-headlines?country=${countryKey}&category=music&apiKey=${apiKey}`;

const xhr = new XMLHttpRequest();
xhr.open('GET', apiUrl, true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      // Procesa los datos aquí
    } else {
      console.error('Error en la solicitud:', xhr.status, xhr.statusText);
    }
  }
};

xhr.send();
