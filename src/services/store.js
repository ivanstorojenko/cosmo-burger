import { constructorSlice } from './burger-constructor/reducer';
import { ingredientDetailSlice } from './ingredient-detail/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
import { orderSlice } from './order/reducer';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';
import { resetPasswordSlice } from './reset-password/reducer';

const rootReducer = combineSlices(
	constructorSlice,
	ingredientDetailSlice,
	burgerIngredientsSlice,
	orderSlice,
	resetPasswordSlice
);

export const configureStore = (initialState) => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};
