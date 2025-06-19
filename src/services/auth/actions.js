import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	register,
	authorize,
	unauthorize,
	getUserInfo,
	changeUserInfo,
} from '@utils/api';
import { setUser, setIsAuthChecked } from './reducer';

const saveTokensToLocalStorage = (accessToken, refreshToken) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const deleteTokensFromLocalStorage = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const registration = createAsyncThunk(
	'auth/registration',
	async (data, { rejectWithValue }) => {
		try {
			const response = await register(data);
			if (response.success) {
				saveTokensToLocalStorage(response.accessToken, response.refreshToken);
			}
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

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

export const login = createAsyncThunk(
	'auth/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await authorize(data);
			if (response.success) {
				saveTokensToLocalStorage(response.accessToken, response.refreshToken);
			}
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

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

export const changeInfo = createAsyncThunk(
	'auth/changeInfo',
	async (data, { rejectWithValue }) => {
		try {
			const response = await changeUserInfo(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
