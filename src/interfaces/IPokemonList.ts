import IPokemonToList from './IPokemonToList';

export default interface IPokemonList {
	count: number;
	next: string;
	previous: string | null;
	results: IPokemonToList[];
}
