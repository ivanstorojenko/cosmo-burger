import { constructorSlice } from './burger-constructor/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
import { orderSlice } from './order/reducer';
import { authSlice } from './auth/reducer';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';
import { resetPasswordSlice } from './reset-password/reducer';

const rootReducer = combineSlices(
	constructorSlice,
	burgerIngredientsSlice,
	orderSlice,
	resetPasswordSlice,
	authSlice
);

export const configureStore = (initialState) => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState: initialState,
	});
};
