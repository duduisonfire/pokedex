import IPokemonElement from '../interfaces/IPokemonElement';
import IPokemonList from '../interfaces/IPokemonList';
import PokeApi from './PokeApi';

export default class PageController {
	api: PokeApi;

	constructor(pokemonApi: PokeApi) {
		this.api = pokemonApi;
	}

	async loadPage(pokemons: IPokemonList) {
		const page = document.querySelector('.pokemons');

		pokemons.results.forEach(async (value) => {
			const pokeInfo = await this.api.getPokemon(value.name);
			const typeTwo = pokeInfo.types[1];
			let typeTwoContent = 'nothing';

			if (typeTwo !== undefined) {
				typeTwoContent = pokeInfo.types[1].type.name;
			}

			const pokemon = {
				pokemonName: pokeInfo.name,
				pokemonNumber: pokeInfo.id,
				pokemonTypeOne: pokeInfo.types[0].type.name,
				pokemonTypeTwo: typeTwoContent,
				pokemonImageUrl: pokeInfo.sprites.other['official-artwork'].front_default,
			};

			const element = this.createElement(pokemon);
			page?.appendChild(element);
		});
	}

	private createElement(pokemon: IPokemonElement) {
		const pokemonElement = document.createElement('li');
		pokemonElement.className = 'pokemon';
		pokemonElement.innerHTML = `
            <span class="number">#${pokemon.pokemonNumber}</span>
            <span class="name">${pokemon.pokemonName}</span>

            <div class="detail">
                <ol class="types">
                    <li class="type">${pokemon.pokemonTypeOne}</li>
                    <li class="type">${pokemon.pokemonTypeTwo}</li>
                </ol>
                <img src="${pokemon.pokemonImageUrl}" alt="${pokemon.pokemonName}">
            </div>
        `;

		return pokemonElement;
	}
}
