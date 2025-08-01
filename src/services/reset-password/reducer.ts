import { createSlice } from '@reduxjs/toolkit';
import { requestPasswordResetCode, requestResetPassword } from './actions';

type TResetPasswordState = {
	isCodeSent: boolean;
	isPasswordReseted: boolean;
	loading: boolean;
	error: string | null;
};

export const initialState: TResetPasswordState = {
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
		isCodeSent: (state: TResetPasswordState) => state.isCodeSent,
		isPasswordReseted: (state: TResetPasswordState) => state.isPasswordReseted,
		resetPasswordLoading: (state: TResetPasswordState) => state.loading,
		resetPasswordError: (state: TResetPasswordState) => state.error,
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
				state.error = action.payload || 'Ошибка при запросе кода';
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
				state.error = action.payload || 'Ошибка при сбросе пароля';
			});
	},
});

export const {
	isCodeSent,
	isPasswordReseted,
	resetPasswordLoading,
	resetPasswordError,
} = resetPasswordSlice.selectors;

export type TResetPasswordSlice = {
	[resetPasswordSlice.name]: TResetPasswordState;
};
