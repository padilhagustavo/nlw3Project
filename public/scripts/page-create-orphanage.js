const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

// create adn add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// Create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// Adcionar o camp de fotos
function addPhotoField() {
  // Pegar o container de fotos #images
  const container = document.querySelector("#images");
  // Pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");
  // Realizar o clone da última imagem adicionada.
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  //Verificar se o campo esta vazio, if yes, não adioncar ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }
  // Limpar o campo antes de acionar ao container de imagens
  input.value = "";
  // Adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length < 2) {
    // Limpar o valor do campo
    span.parentNode.children[0].value = "";
    return;
  }

  // Deletar o campo
  span.parentNode.remove();
}

// Selecionar sim ou não
function toggleSelect(event) {
  // Retirar a classe .active dos dois botões
  document.querySelectorAll(".button-select button").forEach(function (button) {
    button.classList.remove("active");
  });
  // Colocar a classe active nesse botão cliclado
  const button = event.currentTarget;
  button.classList.add("active");

  // Atualizar o meu input hidden com o valor selecionado.
  const input = document.querySelector('[name="open_on_weekends"]');

  // Verificar se sim ou não

  input.value = button.dataset.value;
}

// function validate(event) {
//     // Validar se lat e lgn estão preenchidos
//     const needsLatAndLng = true;
//     if(needsLatAndLng) {
//         event.preventDefault()
//     alert('Seleciona um ponto no Mapa!')
//     }

// }
