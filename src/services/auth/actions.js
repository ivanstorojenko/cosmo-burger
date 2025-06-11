import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	register,
	authorize,
	getUserInfo,
	deleteTokensFromLocalStorage,
} from '@utils/api';
import { setUser, setIsAuthChecked } from './reducer';

export const registration = createAsyncThunk('auth/registration', register);

// export const checkAuth = createAsyncThunk('auth/checkAuth', getUserInfo);
export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			getUserInfo()
				.then((res) => dispatch(setUser(res)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
			deleteTokensFromLocalStorage();
		}
	}
);

export const login = createAsyncThunk('auth/login', authorize);
