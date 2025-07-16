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

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
	});
};

export type RootState = ReturnType<typeof rootReducer>;
// type AppActions = LiveTableActionTypes;
// export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

// export const useDispatch = dispatchHook.withTypes<AppDispatch>();
// export const useSelector = selectorHook.withTypes<RootState>();
