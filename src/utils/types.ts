export type TIngredient = {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TIngredientCategory = {
	type: string;
	name: string;
};

export type TConstructorIngredient = TIngredient & { uid: string };

export type TConstructorIngredients = {
	bun: TConstructorIngredient | null;
	ingredients: Array<TConstructorIngredient> | [];
};

export type TIngredientWithUid = TIngredient & {
	uid: string;
};

export type TUser = {
	email: string;
	name: string;
};

export type TDraggableItem = Pick<TConstructorIngredient, 'uid'> & {
	index: number;
};

export type TOrder = {
	success: true;
	name: string;
	order: {
		ingredients: Array<TIngredient>;
		_id: string;
		owner: {
			name: string;
			email: string;
			createdAt: string;
			updatedAt: string;
		};
		status: string;
		name: string;
		createdAt: string;
		updatedAt: string;
		number: number;
		price: number;
	};
};
