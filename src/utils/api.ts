import { TIngredient, TIngredientWithUid } from './types';

type THeaders = {
	headers: Record<string, string>;
};
type TApiConfig = THeaders & {
	baseUrl: string;
};
type TResponseData<T> = T | undefined;
type TFetchOptions = Omit<RequestInit, 'headers'> & {
	headers?: Record<string, string>;
};
type TUserData = {
	name: string;
	email: string;
	password: string;
};
type TAuthData = Omit<TUserData, 'name'>;
type TRefreshData = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};
type TDefaultRes = {
	success: boolean;
	message: string;
};
type TAuthRes = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
};
type TUserInfoRes = Pick<TAuthRes, 'success' | 'user'>;
type TRefreshTokenRes = Pick<
	TAuthRes,
	'success' | 'accessToken' | 'refreshToken'
>;
type TCreateOrderRes = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};
type TIngredientsRes = {
	succcess: boolean;
	data: Array<TIngredient>;
};

const apiConfig: TApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
} as const;

const getResponse = async <T>(res: Response): Promise<TResponseData<T>> => {
	const data = await res.json();
	if (res.ok) {
		return data as T;
	}
	return Promise.reject(data);
};

const request = <T>(
	endpoint: string,
	options: TFetchOptions = {}
): Promise<TResponseData<T>> => {
	return fetch(`${apiConfig.baseUrl}${endpoint}`, options).then(getResponse<T>);
};

export const refreshToken = () => {
	return request<TRefreshTokenRes>('/auth/token', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then((refreshData) => {
		if (
			typeof refreshData === 'object' &&
			refreshData !== null &&
			'refreshToken' in refreshData &&
			'accessToken' in refreshData
		) {
			const data = refreshData as TRefreshData;

			if (!data.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);

			return data;
		} else {
			throw new Error('Некорректные данные');
		}
	});
};

export const fetchWithRefresh = async <T>(
	endpoint: string,
	options: TFetchOptions
): Promise<TResponseData<T>> => {
	try {
		return await request<T>(endpoint, options);
	} catch (err) {
		if (typeof err === 'object' && err !== null && 'message' in err) {
			if (err.message === 'jwt expired') {
				const refreshData = await refreshToken();
				options.headers = options.headers || {};
				options.headers.authorization = refreshData.accessToken;
				return request<T>(endpoint, options);
			} else {
				return Promise.reject(err);
			}
		} else {
			throw new Error('Неизвестная ошибка');
		}
	}
};

export const getBurgerIngredients = () => {
	return request<TIngredientsRes>('/ingredients');
};

const getAuthizationHeader = () => {
	const accessToken = localStorage.getItem('accessToken');
	const headers: HeadersInit = {};

	if (accessToken !== null) {
		headers['authorization'] = accessToken;
	}

	return headers;
};

export const createOrder = (ingredients: Array<TIngredientWithUid>) => {
	const headers: HeadersInit = getAuthizationHeader();

	return request<TCreateOrderRes>('/orders', {
		method: 'POST',
		headers: {
			...apiConfig.headers,
			...headers,
		},
		body: JSON.stringify({
			ingredients,
		}),
	});
};

export const getPasswordResetCode = (
	email: string
): Promise<TResponseData<TDefaultRes>> => {
	return request<TDefaultRes>('/password-reset', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			email,
		}),
	});
};

export const resetPassword = (
	password: string,
	token: string
): Promise<TResponseData<TDefaultRes>> => {
	return request('/password-reset/reset', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			password,
			token,
		}),
	});
};

export const register = ({ name, email, password }: TUserData) => {
	return request<TAuthRes>('/auth/register', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});
};

export const authorize = ({ email, password }: TAuthData) => {
	return request<TAuthRes>('/auth/login', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			email,
			password,
		}),
	});
};

export const unauthorize = () => {
	const headers: HeadersInit = getAuthizationHeader();
	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) return Promise.reject(new Error('No refresh token'));

	return request<TDefaultRes>('/auth/logout', {
		method: 'POST',
		headers: {
			...apiConfig.headers,
			...headers,
		},
		body: JSON.stringify({ token: refreshToken }),
	});
};

export const getUserInfo = () => {
	const headers: HeadersInit = getAuthizationHeader();

	return fetchWithRefresh<TUserInfoRes>('/auth/user', {
		headers: {
			...headers,
		},
	});
};

export const changeUserInfo = ({ name, email, password }: TUserData) => {
	const headers: HeadersInit = getAuthizationHeader();

	return fetchWithRefresh<TUserInfoRes>('/auth/user', {
		method: 'PATCH',
		headers: {
			...apiConfig.headers,
			...headers,
		},
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});
};
