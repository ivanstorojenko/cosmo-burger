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
// todo добавить остальные экшены
// type AuthActions = ReturnType<typeof authSlice.actions[keyof typeof authSlice.actions]>;
type AppActions = generalFeedActionTypes;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
