import { createSlice } from '@reduxjs/toolkit';
import { requestPasswordResetCode, requestResetPassword } from './actions';

const initialState = {
	isCodeSent: false,
	isPasswordReseted: false,
	loading: false,
	error: null,
};

export const resetPasswordSlice = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {},
	selectors: {
		isCodeSent: (state) => state.resetPassword.isCodeSent,
		isPasswordReseted: (state) => state.resetPassword.isPasswordReseted,
		resetPasswordLoading: (state) => state.resetPassword.loading,
		resetPasswordError: (state) => state.resetPassword.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(requestPasswordResetCode.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(requestPasswordResetCode.fulfilled, (state) => {
				state.loading = false;
				state.isCodeSent = true;
			})
			.addCase(requestPasswordResetCode.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(requestResetPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(requestResetPassword.fulfilled, (state) => {
				state.loading = false;
				state.isPasswordReseted = true;
			})
			.addCase(requestResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const {
	isCodeSent,
	isPasswordReseted,
	resetPasswordLoading,
	resetPasswordError,
} = resetPasswordSlice.selectors;
