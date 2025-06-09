import { createSlice } from '@reduxjs/toolkit';
import { registration } from './actions';
import { saveTokensToLocalStorage } from '../../utils/api';

const initialState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: false,
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
				state.loading = true;
				state.error = null;
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload.success) {
					state.user = action.payload.user;
					saveTokensToLocalStorage(
						action.payload.accessToken,
						action.payload.refreshToken
					);
				} else {
					state.error = action.error.message;
				}
			})
			.addCase(registration.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { userInfo, isAuthChecked, loading, error } = authSlice.selectors;
