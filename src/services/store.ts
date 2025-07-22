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
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
	generalFeedActionTypes,
} from './general-order-feed/actions';
import {
	connect as userFeedConnect,
	disconnect as userFeedDisconnect,
	onClose as userFeedOnClose,
	onConnecting as userFeedOnConnecting,
	onError as userFeedOnError,
	onMessage as userFeedOnMessage,
	onOpen as userFeedOnOpen,
	userFeedActionTypes,
} from './user-order-feed/actions';
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
import { UserFeedSlice } from './user-order-feed/slice';

const rootReducer = combineSlices(
	constructorSlice,
	burgerIngredientsSlice,
	orderSlice,
	resetPasswordSlice,
	authSlice,
	generalFeedSlice,
	UserFeedSlice
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
const userFeedMiddleware = socketMiddleware({
	connect: userFeedConnect,
	disconnect: userFeedDisconnect,
	onConnecting: userFeedOnConnecting,
	onOpen: userFeedOnOpen,
	onClose: userFeedOnClose,
	onError: userFeedOnError,
	onMessage: userFeedOnMessage,
});

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(generalFeedMiddleware, userFeedMiddleware),
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
	| userFeedActionTypes
	| AuthActions
	| constructorActions
	| ingredientsActions
	| orderActions
	| resetPasswordActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
