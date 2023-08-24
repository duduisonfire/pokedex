import PageController from './classes/PageController';
import PokeApi from './classes/PokeApi';

const main = async () => {
	const pokeApi = new PokeApi();
	const pageController = new PageController(pokeApi);
	const pokemonList = await pokeApi.getPokemonsFirstPage();
	await pageController.loadPage(pokemonList);
};

main();
