const poke_container = document.getElementById('poke_container');
const card_container = document.getElementById('card_container');

const pokemons_number = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //const urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const res = await fetch(url);
    //const resDescription = await fetch(urlDescription);
    const pokemon = await res.json();
    //const pokemonDescription = await resDescription.json();
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    console.log(pokemon);
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    //const description = pokemonDescription.flavor_text_entries[flavor_text];
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
     <div class="img-container">
         <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
     </div>
     <div class="info">
         <span class="number">#${pokemon.id
             .toString()
             .padStart(3, '0')}</span><br>
         <a href = "https://www.guj.com.br/t/encaminhar-para-outra-pagina-atraves-de-um-botao-html/191966/3"><button type="button" class="btn btn-outline-dark name">${name}</button></a><br>
         <small class="type">Type: <span>${type}</span></small>
     </div>
    `;

const cardInfoInnerHTML = `
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>`;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();