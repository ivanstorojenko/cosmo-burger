import { createSlice } from '@reduxjs/toolkit';
import { addIngredient, deleteIngredient, sortIngredient } from './actions';

const initialState = {
	constructorIngredients: {
		bun: null,
		ingredients: [],
	},
};

export const constructorSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {},
	selectors: {
		getConstructorIngredients: (state) => state.constructorIngredients,
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIngredient, (state, action) => {
				if (action.payload.type === 'bun') {
					state.constructorIngredients.bun = action.payload;
				} else {
					state.constructorIngredients.ingredients.push(action.payload);
				}
			})
			.addCase(deleteIngredient, (state, action) => {
				state.constructorIngredients.ingredients.filter(
					(ingredient) => ingredient.id !== action.payload
				);
			})
			.addCase(sortIngredient, () => {
				// сортировка внутри массива по DnD
			});
	},
});

export const { actions, reducer } = constructorSlice;
export const { getConstructorIngredients } = constructorSlice.selectors;
