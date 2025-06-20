import { createSlice, createSelector } from '@reduxjs/toolkit';
import { addIngredient, deleteIngredient, moveIngredient } from './actions';
import { placeOrder } from '../order/actions';

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
		getIntgredientsIdArray: createSelector(
			(state) => state.constructorIngredients.bun,
			(state) => state.constructorIngredients.ingredients,
			(bun, ingredients) => {
				if (bun && ingredients.length > 0) {
					return [bun._id, ...ingredients.map((item) => item._id)];
				} else {
					return null;
				}
			}
		),
		getOrderPrice: (state) => {
			const bunsPrice = state.constructorIngredients.bun
				? state.constructorIngredients.bun.price * 2
				: 0;
			const ingredientsPrice = state.constructorIngredients.ingredients.reduce(
				function (acc, ingredient) {
					return acc + +ingredient.price;
				},
				0
			);

			return bunsPrice + ingredientsPrice;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIngredient, (state, action) => {
				const ingredient = action.payload;

				if (ingredient.type === 'bun') {
					state.constructorIngredients.bun = ingredient;
				} else {
					state.constructorIngredients.ingredients.push(ingredient);
				}
			})
			.addCase(deleteIngredient, (state, action) => {
				state.constructorIngredients.ingredients =
					state.constructorIngredients.ingredients.filter(
						(ingredient) => ingredient.uid !== action.payload
					);
			})
			.addCase(moveIngredient, (state, action) => {
				const dragIngredient =
					state.constructorIngredients.ingredients[action.payload.dragIndex];
				const ingredients = state.constructorIngredients.ingredients;
				ingredients.splice(action.payload.dragIndex, 1);
				ingredients.splice(action.payload.hoverIndex, 0, dragIngredient);
				state.constructorIngredients.ingredients = ingredients;
			})
			.addCase(placeOrder.fulfilled, () => ({
				constructorIngredients: {
					bun: null,
					ingredients: [],
				},
			}));
	},
});

export const { actions, reducer } = constructorSlice;
export const {
	getConstructorIngredients,
	getIntgredientsIdArray,
	getOrderPrice,
} = constructorSlice.selectors;
