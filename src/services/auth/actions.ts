import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	register,
	authorize,
	unauthorize,
	getUserInfo,
	changeUserInfo,
	TAuthRes,
	TUserData,
	TAuthData,
	TUserInfoRes,
} from '@utils/api';
import { setUser, setIsAuthChecked } from './reducer';

const saveTokensToLocalStorage = (
	accessToken: string,
	refreshToken: string
): void => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};

const deleteTokensFromLocalStorage = (): void => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const registration = createAsyncThunk<
	TAuthRes,
	TUserData,
	{ rejectValue: string }
>('auth/registration', async (data: TUserData, { rejectWithValue }) => {
	try {
		const response = await register(data);

		if (!response) {
			return rejectWithValue('No response from server');
		}

		if (response.success) {
			saveTokensToLocalStorage(response.accessToken, response.refreshToken);
			return response;
		}

		return rejectWithValue('Registration failed');
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Unknown error occurred');
	}
});

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

export const login = createAsyncThunk<
	TAuthRes,
	TAuthData,
	{ rejectValue: string }
>('auth/login', async (data: TAuthData, { rejectWithValue }) => {
	try {
		const response = await authorize(data);

		if (!response) {
			return rejectWithValue('No response from server');
		}

		if (response.success) {
			saveTokensToLocalStorage(response.accessToken, response.refreshToken);
			return response;
		}

		return rejectWithValue('Authorization failed');
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Unknown error occurred');
	}
});

export const logout = createAsyncThunk<null, void, { rejectValue: string }>(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await unauthorize();
			deleteTokensFromLocalStorage();
			return null;
		} catch (error: unknown) {
			deleteTokensFromLocalStorage();
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error occurred');
		}
	}
);

export const changeInfo = createAsyncThunk<
	TUserInfoRes,
	TUserData,
	{ rejectValue: string }
>('auth/changeInfo', async (data: TUserData, { rejectWithValue }) => {
	try {
		const response = await changeUserInfo(data);

		if (!response) {
			return rejectWithValue('No response from server');
		}

		if (!response.success) {
			return rejectWithValue('Failed to update user info');
		}

		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Unknown error occurred');
	}
});
