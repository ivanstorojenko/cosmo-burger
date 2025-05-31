import { createSlice } from '@reduxjs/toolkit';
import { setCurrentIngredient, deleteCurrentIngredient } from './actions';

const initialState = {
	currentIngredient: null,
};

export const ingredientDetailSlice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: {},
	selectors: {
		getCurrentIngredient: (state) => state.currentIngredient,
	},
	extraReducers: (builder) => {
		builder
			.addCase(setCurrentIngredient, (state, action) => {
				state.currentIngredient = action.payload;
			})
			.addCase(deleteCurrentIngredient, (state) => {
				state.currentIngredient = null;
			});
	},
});

export const { actions, reducer } = ingredientDetailSlice;
export const { getCurrentIngredient } = ingredientDetailSlice.selectors;
