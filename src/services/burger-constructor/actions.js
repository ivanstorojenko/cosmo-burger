import { createAction, nanoid } from '@reduxjs/toolkit';

export const addIngredient = createAction(
	'ingredientDetail/addIngredient',
	(ingredient) => {
		const uid = nanoid();
		return {
			payload: {
				...ingredient,
				uid,
			},
		};
	}
);

export const deleteIngredient = createAction(
	'ingredientDetail/deleteIngredient'
);
export const moveIngredient = createAction('ingredientDetail/moveIngredient');
