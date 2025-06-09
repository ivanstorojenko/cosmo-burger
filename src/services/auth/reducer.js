import { createSlice } from '@reduxjs/toolkit';
import { registration, checkAuth, login } from './actions';
import {
	saveTokensToLocalStorage,
	deleteTokensFromLocalStorage,
} from '../../utils/api';

const initialState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: false,
};

const handlePending = (state) => {
	state.loading = true;
	state.error = null;
};

const handleFulfilled = (state, action) => {
	state.loading = false;

	if (action.payload.success) {
		state.user = action.payload.user;
		saveTokensToLocalStorage(
			action.payload.accessToken,
			action.payload.refreshToken
		);
	} else {
		state.error = action.error?.message || 'Ошибка авторизации';
	}
};

const handleRejected = (state, action) => {
	state.loading = false;
	state.error = action.error?.message || 'Ошибка авторизации';
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	selectors: {
		userInfo: (state) => state.user,
		isAuthChecked: (state) => state.isAuthChecked,
		loading: (state) => state.loading,
		error: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, (state) => {
				handlePending(state);
			})
			.addCase(registration.fulfilled, (state, action) => {
				handleFulfilled(state, action);
			})
			.addCase(registration.rejected, (state, action) => {
				handleRejected(state, action);
			})
			.addCase(login.pending, (state) => {
				handlePending(state);
			})
			.addCase(login.fulfilled, (state, action) => {
				handleFulfilled(state, action);
			})
			.addCase(login.rejected, (state, action) => {
				handleRejected(state, action);
			})
			.addCase(checkAuth.pending, (state) => {
				handlePending(state);
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				console.log(action);
				state.loading = false;
				state.isAuthChecked = true;

				if (action.payload.success) {
					state.user = action.payload.user;
				} else {
					deleteTokensFromLocalStorage();
				}
			})
			.addCase(checkAuth.rejected, (state) => {
				state.loading = false;
				deleteTokensFromLocalStorage();
			});
	},
});

export const { userInfo, isAuthChecked, loading, error } = authSlice.selectors;
