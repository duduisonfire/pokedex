import axios from '../../node_modules/axios/index';

export const HttpRequest = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/pokemon',
});
