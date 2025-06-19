import { createSlice } from '@reduxjs/toolkit';
import { registration, login, logout, changeInfo } from './actions';

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

	if (action.payload?.success) {
		state.user = action.payload.user;
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
			if (action.payload?.success) {
				state.user = action.payload.user;
			} else {
				state.user = null;
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
			.addCase(registration.pending, handlePending)
			.addCase(registration.fulfilled, handleFulfilled)
			.addCase(registration.rejected, handleRejected)
			.addCase(login.pending, handlePending)
			.addCase(login.fulfilled, handleFulfilled)
			.addCase(login.rejected, handleRejected)
			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.user = null;
			})
			.addCase(changeInfo.pending, handlePending)
			.addCase(changeInfo.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload?.success) {
					state.user = action.payload.user;
				} else {
					state.error = action.error?.message || 'Ошибка авторизации';
				}
			})
			.addCase(changeInfo.rejected, handleRejected);
	},
});

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const { getUserInfo, getIsAuthChecked, getLoading, getError } =
	authSlice.selectors;
