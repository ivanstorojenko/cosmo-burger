import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients, setActiveTab } from './actions';
import { TIngredient } from '@/utils/types';

type TBurgerIngredientsState = {
	ingredients: Array<TIngredient>;
	loading: boolean;
	error: null | string;
	ingredientTypes: Array<{ type: TIngredient['type']; name: string }>;
	activeTab: string;
};

const initialState: TBurgerIngredientsState = {
	ingredients: [],
	loading: true,
	error: null,
	ingredientTypes: [
		{ type: 'bun', name: 'Булки' },
		{ type: 'main', name: 'Начинки' },
		{ type: 'sauce', name: 'Соусы' },
	],
	activeTab: 'bun',
};

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getIngredientTypes: (state) => state.ingredientTypes,
		getActiveTab: (state) => state.activeTab,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload.data;
				state.loading = false;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message ||
					action.error.message ||
					'Unknown error occurred';
			})
			.addCase(setActiveTab, (state, action) => {
				state.activeTab = action.payload;
			});
	},
});

export const {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
	getIngredientTypes,
	getActiveTab,
} = burgerIngredientsSlice.selectors;

export type TBurgerIngredientsSlice = {
	[burgerIngredientsSlice.name]: TBurgerIngredientsState;
};
