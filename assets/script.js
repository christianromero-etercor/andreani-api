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

  fetch (`https://apidestinatarios.andreani.com/api/envios/${numeroAndreani}/trazas`, options)
  .then(response => {
    return response.json();
  })
  .then (data => {
    const $infonumeroAndreani = document.getElementById("infonumeroAndreani");
  $infonumeroAndreani.style.display = 'block'

    // Exibe información del envío
    let infonumeroAndreani = "";
    if (data.code === "404") {
      exibeIcone("remove");
      infonumeroAndreani = `
      <div class="alert alert-info alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div>El número ingresado es inexistente</div>
    </div>
      `;

    } else {

      exibeIcone("check");

      infonumeroAndreani +=`<div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <table class="label-data" border="1" style="background-color: #d71921;color: white;height: 35px;">
      <tbody><tr>
      <td class="col-2">Fecha/Hora</td>
      <td class="col-4">Estado del pedido</td>
      <td class="col-3">Evento</td>
      <td class="col-3">Sucursal</td>
      </tr>
      </tbody></table>`;

      for (var i = 0; i < data.length; i++) {
        infonumeroAndreani +=`

        <table border="1">
        <tr>
        <td class="col-2">${data[i].fecha.dia} ${data[i].fecha.hora}</td>
        <td class="col-4">${data[i].estado}</td>
        <td class="col-3">${data[i].evento}</td>
        <td class="col-3">${data[i].sucursal}</td>
        </tr>
        </table>`;
      }
          // Insere a template no DOM
    document.querySelector("#infonumeroAndreani").innerHTML = infonumeroAndreani;
    }
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
