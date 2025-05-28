// import { constructorSlice } from "./constructor/reducer";
import { ingredientDetailSlice } from './ingredient-detail/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
// import { orderSlice } from "./orderSlice/reducer";
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(
	// constructorSlice,
	ingredientDetailSlice,
	burgerIngredientsSlice
	// orderSlice
);

export const configureStore = (initialState) => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};
