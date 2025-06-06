import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPasswordResetCode, resetPassword } from '../../utils/api';

export const requestPasswordResetCode = createAsyncThunk(
	'reset-password/requestPasswordResetCode',
	getPasswordResetCode
);

export const requestResetPassword = createAsyncThunk(
	'reset-password/requestResetPassword',
	resetPassword
);
