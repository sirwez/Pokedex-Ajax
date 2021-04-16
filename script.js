const poke_container = document.getElementById('poke_container');
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
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    //const description = pokemonDescription.flavor_text_entries[flavor_text];
    const weight = pokemon.weight / 10;
    const height = pokemon.height / 10;
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
            <button type="button" class="btn btn-outline-dark name" data-bs-toggle="modal" data-bs-target="#exampleModal">
                ${name}</button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ability">
                            <h3 class="weight">Weight: ${weight}KG</h3>
                            <h3 class="height">Height: ${height}m</h3>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-warning" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();