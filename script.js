//  let currentPokemonId = null;

async function buscarPokemon(input) {
  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Pokémon não encontrado: ${response.status}`);
    }

    const data = await response.json();
    currentPokemonId = data.id;
    exibirPokemon(data);
  } catch (error) {}
}

function exibirPokemon(pokemon) {
  const pokemonContainer = document.getElementById("pokemons");
  pokemonContainer.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    `;
}

document.getElementById("buscar-button").addEventListener("click", () => {
  const pokemonInput = document.getElementById("pokemon-input").value;
  if (pokemonInput) {
    buscarPokemon(pokemonInput);
  }
});

document.getElementById("antes-botao").addEventListener("click", () => {
  if (currentPokemonId > 1) {
    buscarPokemon(currentPokemonId - 1);
  }
});

document.getElementById("proximo-botao").addEventListener("click", () => {
  if (currentPokemonId !== null) {
    buscarPokemon(currentPokemonId + 1);
  }
});
