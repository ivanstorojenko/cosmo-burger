import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getPasswordResetCode,
	resetPassword,
	TDefaultRes,
} from '../../utils/api';

type TResetPasswordArgs = {
	password: string;
	token: string;
};

export const requestPasswordResetCode = createAsyncThunk<
	TDefaultRes,
	string,
	{ rejectValue: string }
>(
	'reset-password/requestPasswordResetCode',
	async (email, { rejectWithValue }) => {
		try {
			const response = await getPasswordResetCode(email);
			if (!response?.success) {
				throw new Error(response?.message || 'Не удалось отправить код');
			}
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Неизвестная ошибка при запросе кода');
		}
	}
);

export const requestResetPassword = createAsyncThunk<
	TDefaultRes,
	TResetPasswordArgs,
	{ rejectValue: string }
>(
	'reset-password/requestResetPassword',
	async ({ password, token }, { rejectWithValue }) => {
		try {
			const response = await resetPassword(password, token);
			if (!response?.success) {
				throw new Error(response?.message || 'Не удалось сбросить пароль');
			}
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Неизвестная ошибка при сбросе пароля');
		}
	}
);
