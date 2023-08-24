import IPokemon from '../interfaces/IPokemon';
import IPokemonList from '../interfaces/IPokemonList';
import { HttpRequest } from './HttpRequest';

export default class PokeApi {
	api = HttpRequest;

	async getPokemonsFirstPage() {
		const pokemonsList = (await this.api.get(`?offset=0&&limit=9`)).data as IPokemonList;

		return pokemonsList;
	}

	async getPokemonsNextOrPreviousPage(url: string) {
		const pokemonsList = (await this.api.get(url)).data as IPokemonList;

		return pokemonsList;
	}

	async getPokemon(pokemonName: string) {
		const pokemon = (await this.api.get(`/${pokemonName}`)).data as IPokemon;

		return pokemon;
	}
}
