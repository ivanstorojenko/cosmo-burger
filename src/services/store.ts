import { constructorSlice } from './burger-constructor/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
import { orderSlice } from './order/reducer';
import { authSlice } from './auth/reducer';
import {
	combineSlices,
	configureStore as createStore,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { resetPasswordSlice } from './reset-password/reducer';
import { generalFeedSlice } from './general-order-feed/slice';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect,
	disconnect,
	generalFeedActionTypes,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from './general-order-feed/actions';
import {
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import {
	addIngredient,
	deleteIngredient,
	moveIngredient,
} from './burger-constructor/actions';
import { hideOrderDetails } from './order/actions';

import { setActiveTab } from './burger-ingredients/actions';

const rootReducer = combineSlices(
	constructorSlice,
	burgerIngredientsSlice,
	orderSlice,
	resetPasswordSlice,
	authSlice,
	generalFeedSlice
);

const generalFeedMiddleware = socketMiddleware({
	connect: connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(generalFeedMiddleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;

type AuthActions = ReturnType<
	(typeof authSlice.actions)[keyof typeof authSlice.actions]
>;
type constructorActions =
	| ReturnType<
			(typeof constructorSlice.actions)[keyof typeof constructorSlice.actions]
	  >
	| ReturnType<typeof addIngredient>
	| ReturnType<typeof deleteIngredient>
	| ReturnType<typeof moveIngredient>;
type ingredientsActions =
	| ReturnType<
			(typeof burgerIngredientsSlice.actions)[keyof typeof burgerIngredientsSlice.actions]
	  >
	| ReturnType<typeof setActiveTab>;
type orderActions =
	| ReturnType<(typeof orderSlice.actions)[keyof typeof orderSlice.actions]>
	| ReturnType<typeof hideOrderDetails>;
type resetPasswordActions = ReturnType<
	(typeof resetPasswordSlice.actions)[keyof typeof resetPasswordSlice.actions]
>;

type AppActions =
	| generalFeedActionTypes
	| AuthActions
	| constructorActions
	| ingredientsActions
	| orderActions
	| resetPasswordActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
