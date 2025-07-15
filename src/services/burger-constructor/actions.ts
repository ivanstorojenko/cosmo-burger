import { createAction, nanoid } from '@reduxjs/toolkit';
import {
	TIngredient,
	TIngredientWithUid,
	TMoveIngredientPayload,
} from '@utils/types';

export const addIngredient = createAction(
	'ingredientDetail/addIngredient',
	(ingredient: TIngredient) => {
		const uid = nanoid();
		return {
			payload: {
				...ingredient,
				uid,
			} as TIngredientWithUid,
		};
	}
);

export const deleteIngredient = createAction(
	'ingredientDetail/deleteIngredient',
	(uid: string) => ({ payload: uid })
);

export const moveIngredient = createAction(
	'ingredientDetail/moveIngredient',
	({ dragIndex, hoverIndex }: TMoveIngredientPayload) => ({
		payload: { dragIndex, hoverIndex },
	})
);
