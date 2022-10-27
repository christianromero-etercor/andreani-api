// Aguarda Submit
document.querySelector('#numeroAndreaniForm').addEventListener('submit', getnumeroAndreaniInfo);
infonumeroAndreani.classList.remove("display");

// hiding loading
function hideLoading() {
    loader.classList.remove("display");
    cargando.classList.remove("display");
}

const token = fetch("https://apis.andreani.com/login", {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'basic c29sbmlrX2dsYTpiM2trMEF0OUo1THVwMUY=',
  },
})
.then(response => response.json())
.then(data => {
  sessionStorage.setItem("x-authorization-token", data.token)
})
.catch(console.error);


function getnumeroAndreaniInfo(e) {
  // Pega valor do cep do input
  const numeroAndreani = document.querySelector('.numeroAndreani').value;

  const $loader = document.getElementById("loader");
  $loader.style.display = 'block'
  const $cargando = document.getElementById("cargando");
  $cargando.style.display = 'block'
  const $infonumeroAndreani = document.getElementById("infonumeroAndreani");
  $infonumeroAndreani.style.display = 'none'

 var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};

var url = 'https://apis.andreani.com/v2/envios/360000562978380/trazas';
var method = 'GET';
var xhr = createCORSRequest(method, url, infonumeroAndreani);

xhr.onload = function() {
  const $infonumeroAndreani = document.getElementById("infonumeroAndreani");
  $infonumeroAndreani.style.display = 'block'

    // Exibe información del envío
    let infonumeroAndreani = "";
    if(infonumeroAndreani == 'undefined') {
      exibeIcone("remove");
      infonumeroAndreani += `
      <div class="alert alert-info alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      Número de envío inexistente.
    </div>
      `;
    } else {
      exibeIcone("check");
      infonumeroAndreani += `
      <div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="alert-heading">${data.Estado}</h4>
      <hr>
      <p class="m-0"><strong>Fecha: </strong>${data.Fecha}</p>
      <p class="m-0"><strong>Código de estado: </strong>${data.EstadoId}</p>
      <p class="m-0"><strong>Traducción: </strong>${data.Traduccion}</p>
      <p class="m-0"><strong>Sucursal: </strong>${data.Sucursal}</p>
      <p class="m-0"><strong>Ciclo: </strong>${data.Ciclo}</p>
      </div>
      `;
    }

    // Insere a template no DOM
    document.querySelector("#infonumeroAndreani").innerHTML = infonumeroAndreani;
};

xhr.onerror = function() {
  // Error code goes here.
};

xhr.withCredentials = true;
xhr.setRequestHeader('x-authorization-token', sessionStorage.getItem('x-authorization-token'));
xhr.send();

e.preventDefault();
}

// Máscara para validar entrada de datos
$(document).ready(function(){
  $('#numeroAndreani').mask('000000000000000');
});

// Exibe/remove ícones da linha de input
function exibeIcone(icone) {
  // Limpa icones
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Exibe ícone adequado
  document.querySelector(`.icon-${icone}`).style.display = "inline-flex";
}

// Limpa entrada e ícones
$("#infonumeroAndreani").on('close.bs.alert', function(){
  document.querySelector(".numeroAndreani").value = "";
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  document.querySelector(".numeroAndreani").focus();
});
