import { createSlice, nanoid } from '@reduxjs/toolkit';
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
				const ingredient = { ...action.payload };
				ingredient.id = nanoid();

				if (ingredient.type === 'bun') {
					state.constructorIngredients.bun = ingredient;
				} else {
					state.constructorIngredients.ingredients.push(ingredient);
				}
			})
			.addCase(deleteIngredient, (state, action) => {
				state.constructorIngredients.ingredients =
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
