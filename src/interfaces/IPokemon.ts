export default interface IPokemon {
	id: number;
	name: string;
	types: {
		slot: number;
		type: { name: string; url: string };
	}[];
	sprites: {
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
	moves: {
		move: {
			name: number;
			url: string;
		};
		version_group_details: {
			level_learned_at: number;
			move_learn_method: {
				name: string;
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}[];
	}[];
}
