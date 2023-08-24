import IPokemonElement from '../interfaces/IPokemonElement';
import IPokemonList from '../interfaces/IPokemonList';
import IPokemonToList from '../interfaces/IPokemonToList';
import PokeApi from './PokeApi';

export default class PageController {
	api: PokeApi;

	constructor(pokemonApi: PokeApi) {
		this.api = pokemonApi;
	}

	async loadPage(pokemons: IPokemonList) {
		const page = document.querySelector('.content');
		const pokemonList = document.createElement('ol');
		pokemonList.className = 'pokemons';

		for (let index = 0; index < pokemons.results.length; index++) {
			const pokemon = await this.createPokemon(pokemons.results[index]);
			pokemonList.appendChild(this.createPokemonElement(pokemon));
		}

		page?.appendChild(pokemonList);
	}

	private async createPokemon(pokemon: IPokemonToList) {
		const pokeInfo = await this.api.getPokemon(pokemon.name);
		const typeTwo = pokeInfo.types[1];
		let typeTwoContent = 'nothing';

		if (typeTwo !== undefined) {
			typeTwoContent = pokeInfo.types[1].type.name;
		}

		const myPokemon = {
			pokemonName: pokeInfo.name,
			pokemonNumber: pokeInfo.id,
			pokemonTypeOne: pokeInfo.types[0].type.name,
			pokemonTypeTwo: typeTwoContent,
			pokemonImageUrl: pokeInfo.sprites.other['official-artwork'].front_default,
		};

		return myPokemon;
	}

	private createPokemonElement(pokemon: IPokemonElement) {
		const pokemonElement = document.createElement('li');
		pokemonElement.className = `pokemon ${pokemon.pokemonTypeOne}`;
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
