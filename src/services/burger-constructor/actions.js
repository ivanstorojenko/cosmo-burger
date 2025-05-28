import { createAction } from '@reduxjs/toolkit';

export const addIngredient = createAction('ingredientDetail/addIngredient');
export const deleteIngredient = createAction(
	'ingredientDetail/deleteIngredient'
);
export const sortIngredient = createAction('ingredientDetail/sortIngredient');
