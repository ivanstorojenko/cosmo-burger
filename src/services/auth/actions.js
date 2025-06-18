import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	register,
	authorize,
	unauthorize,
	getUserInfo,
	deleteTokensFromLocalStorage,
	changeUserInfo,
} from '@utils/api';
import { setUser, setIsAuthChecked } from './reducer';

export const registration = createAsyncThunk('auth/registration', register);

export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			getUserInfo()
				.then(
					(res) => dispatch(setUser(res)),
					() => deleteTokensFromLocalStorage()
				)
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
			deleteTokensFromLocalStorage();
		}
	}
);

export const login = createAsyncThunk('auth/login', authorize);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await unauthorize();
			deleteTokensFromLocalStorage();
			return null;
		} catch (error) {
			deleteTokensFromLocalStorage();
			return rejectWithValue(error.message);
		}
	}
);

export const changeInfo = createAsyncThunk('auth/changeInfo', changeUserInfo);
