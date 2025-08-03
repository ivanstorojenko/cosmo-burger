import { describe, it, expect } from 'vitest';
import { resetPasswordSlice, initialState } from './reducer';
import { requestPasswordResetCode, requestResetPassword } from './actions';

describe('resetPasswordSlice reducer', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(
				resetPasswordSlice.reducer(undefined, { type: 'unknown' })
			).toEqual(initialState);
		});
	});

	describe('requestPasswordResetCode actions', () => {
		it('should handle requestPasswordResetCode.pending', () => {
			const action = { type: requestPasswordResetCode.pending.type };
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: true,
				error: null,
			});
		});

		it('should handle requestPasswordResetCode.fulfilled', () => {
			const action = { type: requestPasswordResetCode.fulfilled.type };
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				isCodeSent: true,
			});
		});

		it('should handle requestPasswordResetCode.rejected with payload', () => {
			const errorMessage = 'Email not found';
			const action = {
				type: requestPasswordResetCode.rejected.type,
				payload: errorMessage,
			};
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});

		it('should handle requestPasswordResetCode.rejected without payload', () => {
			const action = {
				type: requestPasswordResetCode.rejected.type,
				error: { message: 'Network error' },
			};
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: 'Ошибка при запросе кода',
			});
		});
	});

	describe('requestResetPassword actions', () => {
		it('should handle requestResetPassword.pending', () => {
			const action = { type: requestResetPassword.pending.type };
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: true,
				error: null,
			});
		});

		it('should handle requestResetPassword.fulfilled', () => {
			const action = { type: requestResetPassword.fulfilled.type };
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				isPasswordReseted: true,
			});
		});

		it('should handle requestResetPassword.rejected with payload', () => {
			const errorMessage = 'Invalid reset token';
			const action = {
				type: requestResetPassword.rejected.type,
				payload: errorMessage,
			};
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: errorMessage,
			});
		});

		it('should handle requestResetPassword.rejected without payload', () => {
			const action = {
				type: requestResetPassword.rejected.type,
				error: { message: 'Server error' },
			};
			const state = resetPasswordSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				loading: false,
				error: 'Ошибка при сбросе пароля',
			});
		});
	});
});
