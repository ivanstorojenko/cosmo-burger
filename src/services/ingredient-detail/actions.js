import { createAction } from '@reduxjs/toolkit';

export const setCurrentIngredient = createAction(
	'ingredientDetail/setCurrentIngredient'
);
export const deleteCurrentIngredient = createAction(
	'ingredientDetail/deleteCurrentIngredient'
);
