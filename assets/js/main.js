const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

var modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Close",
  cssClass: ["custom-class-1", "custom-class-2"],
});

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <button class="more-details" onclick="loadPokemonDetails('${
              pokemon.name
            }')">
              Ver mais
            </button>
        </li>
    `;
}

function showPokemonDetails(pokemonDetails) {
  return `
  <div class="container">
    <div id="card">
      <p class="hp">
        <span>HP</span>
        <span style="font-size: 1.5rem">${pokemonDetails.hp}</span>
      </p>
      <img src="${pokemonDetails.photo}" alt="${pokemonDetails.name}" >
        <h2 class="poke-name">${pokemonDetails.name}</h2>
        <ul class="types">
          ${pokemonDetails.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
        </ul>
        <div class="stats">
          <div>
            <h3>${pokemonDetails.attack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${pokemonDetails.defense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${pokemonDetails.speed}</h3>
            <p>Speed</p>
            </div>
        </div>
      </div>
    </div>
  `;
}

function loadPokemonDetails(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => {
      let pokemonDetails = createPokemonDetailsObject(jsonBody);
      document.getElementById("pokemonDetails").innerHTML = modal.setContent(
        showPokemonDetails(pokemonDetails)
      );
      modal.open();
    });
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
