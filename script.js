const poke_container = document.getElementById('poke_container');

const pokemons_number =  891; // Só vai até 196
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
    const urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const res = await fetch(url);
    const resDescription = await fetch(urlDescription);
    const pokemon = await res.json();
    const pokemonDescription = await resDescription.json();
    createPokemonCard(pokemon, pokemonDescription);
};

function createPokemonCard(pokemon, pokemonDescription) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    const text = pokemonDescription.flavor_text_entries[0].flavor_text;
    const gen = pokemonDescription.generation.name;
    var str = gen;
    var textoReplace = "generation-";
    var generation = str.substring(str.indexOf(textoReplace) + textoReplace.length);
    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `   
    <div class="">
       <div class=" d-flex justify-content-center">
           <div class="" style="width: 9rem;">
               <div class="img-container">
                   <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
               </div>
           </div>
           <div class="info">
               <span class="fs-3 fw-bold">${name}</span> &nbsp
               <span class="number">#${pokemon.id
                   .toString()
                   .padStart(3, '0')}</span><br>
               <p class="card-text text">${text}</p>
           </div> <br> &nbsp &nbsp
           <div class="">
               <ul class="list-group">
                   <li class="list-group-item d-flex justify-content-between align-items-center type">
                       Type
                       <span class="badge bg-primary rounded-pill">${type[0].toUpperCase()+type.slice(1)}</span>
                   </li>
                   <li class="list-group-item d-flex justify-content-between align-items-center">
                       Weight:
                       <span class="badge bg-primary rounded-pill">${pokemon.weight/10}</span>
                   </li>
                   <li class="list-group-item d-flex justify-content-between align-items-center">
                       Height:
                       <span class="badge bg-primary rounded-pill">${pokemon.height/10}</span>
                   </li>
                   <li class="list-group-item d-flex justify-content-between align-items-center">
                       GENERATION&nbsp&nbsp&nbsp&nbsp&nbsp
                       <span class="badge bg-primary rounded-pill generation">${generation.toUpperCase()}</span>
                   </li>
               </ul>
           </div>
       </div>
   </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();