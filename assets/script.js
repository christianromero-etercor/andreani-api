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
    'Authorization': 'Basic ' + btoa('xxxxxx_gla:b3kk0At9J5Lup1F'),
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

  var options = {
  method: 'GET',
  headers: {
    'x-authorization-token': sessionStorage.getItem('x-authorization-token'),
}
};

  fetch (`https://apidestinatarios.andreani.com/api/envios/${numeroAndreani}`, options)
  .then(response => {
    return response.json();
  })
  .then (data => {
    const $infonumeroAndreani = document.getElementById("infonumeroAndreani");
  $infonumeroAndreani.style.display = 'block'

    // Exibe información del envío
    let infonumeroAndreani = "";
    if(typeof data.codigoDeEnvioInterno == 'undefined') {
      exibeIcone("remove");
      infonumeroAndreani = `
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
      <h4 class="alert-heading">${data.estado}</h4>
      <hr>
      <p class="m-0"><strong>N° de envío: </strong>${data.codigoDeEnvioInterno}</p>
      <p class="m-0"><strong>Fecha de alta: </strong>${data.fechaDeAlta}</p>
      <p class="m-0"><strong>Remitente: </strong>${data.remitente}</p>
      <p class="m-0"><strong>Servicio: </strong>${data.servicio}</p>
      <p class="m-0"><strong>Sucursal de destino: </strong>${data.codigoSucursalDistribucion} - ${data.nombreSucursalDistribucion}</p>
      </div>
      `;
    }

    // Insere a template no DOM
    document.querySelector("#infonumeroAndreani").innerHTML = infonumeroAndreani;
  })
  .finally(()=>{
    $loader.style.display = 'none';
    $cargando.style.display = 'none';
  })


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
