import IPokemon from '../interfaces/IPokemon';
import IPokemonList from '../interfaces/IPokemonList';
import { HttpRequest } from './HttpRequest';

export default class PokeApi {
	api = HttpRequest;
	actualPage = '';
	previousPage = '';
	nextPage = '';

	async getPokemonsFirstPage() {
		const pokemonsList = (await this.api.get(`?offset=0&&limit=9`)).data as IPokemonList;
		this.actualPage = 'https://pokeapi.co/api/v2/pokemon/?offset=0&&limit=9';
		this.nextPage = pokemonsList.next;
		return pokemonsList;
	}

	async getPokemonsNextOrPreviousPage(page: string) {
		let url: string;

		if (page === 'next') {
			url = this.nextPage.replace('https://pokeapi.co/api/v2/pokemon', '');
		} else {
			url = this.previousPage.replace('https://pokeapi.co/api/v2/pokemon', '');
		}

		const pokemonsList = (await this.api.get(url)).data as IPokemonList;
		this.actualPage = 'https://pokeapi.co/api/v2/pokemon' + url;
		this.nextPage = pokemonsList.next;
		this.previousPage = pokemonsList.previous as string;

		return pokemonsList;
	}

	async getPokemon(pokemonName: string) {
		const pokemon = (await this.api.get(`/${pokemonName}`)).data as IPokemon;
		return pokemon;
	}
}
