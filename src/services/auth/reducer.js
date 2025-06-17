import { createSlice } from '@reduxjs/toolkit';
import { registration, login, changeInfo } from './actions';
import {
	saveTokensToLocalStorage,
	deleteTokensFromLocalStorage,
} from '@utils/api';

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
		state.error = action.error?.message || 'Ошибка';
	}
};

const handleRejected = (state, action) => {
	state.loading = false;
	state.error = action.error?.message || 'Ошибка';
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			if (action.payload.success) {
				state.user = action.payload.user;
			} else {
				deleteTokensFromLocalStorage();
			}
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUserInfo: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
		getLoading: (state) => state.loading,
		getError: (state) => state.error,
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
			.addCase(changeInfo.pending, (state) => {
				handlePending(state);
			})
			.addCase(changeInfo.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload.success) {
					state.user = action.payload.user;
				} else {
					state.error = action.error?.message || 'Ошибка авторизации';
				}
			})
			.addCase(changeInfo.rejected, (state, action) => {
				handleRejected(state, action);
			});
	},
});

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const { getUserInfo, getIsAuthChecked, getLoading, getError } =
	authSlice.selectors;
