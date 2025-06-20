const apiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

const getResponse = async (res) => {
	const data = await res.json();
	if (res.ok) {
		return data;
	}
	return Promise.reject(data); // Передаем весь объект ошибки
};

const request = (endpoint, options) => {
	return fetch(`${apiConfig.baseUrl}${endpoint}`, options).then(getResponse);
};

export const getBurgerIngredients = () => {
	return request('/ingredients');
};

export const createOrder = (ingredients) => {
	return request('/orders', {
		method: 'POST',
		headers: {
			...apiConfig.headers,
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			ingredients,
		}),
	});
};

export const getPasswordResetCode = (email) => {
	return request('/password-reset', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			email,
		}),
	});
};

export const resetPassword = (password, token) => {
	return request('/password-reset/reset', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			password,
			token,
		}),
	});
};

export const register = ({ name, email, password }) => {
	return request('/auth/register', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});
};

export const authorize = ({ email, password }) => {
	return request('/auth/login', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			email,
			password,
		}),
	});
};

export const unauthorize = () => {
	return request('/auth/logout', {
		method: 'POST',
		headers: {
			...apiConfig.headers,
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
};

export const refreshToken = () => {
	return request('/auth/token', {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then((refreshData) => {
		if (!refreshData.success) {
			return Promise.reject(refreshData);
		}
		localStorage.setItem('refreshToken', refreshData.refreshToken);
		localStorage.setItem('accessToken', refreshData.accessToken);
		return refreshData;
	});
};

export const fetchWithRefresh = async (endpoint, options) => {
	try {
		return await request(endpoint, options);
	} catch (err) {
		// Проверяем как строковую ошибку, так и объект с полем message
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			return request(endpoint, options);
		} else {
			return Promise.reject(err);
		}
	}
};

export const getUserInfo = () => {
	return fetchWithRefresh('/auth/user', {
		headers: {
			authorization: localStorage.getItem('accessToken'),
		},
	});
};

export const changeUserInfo = ({ name, email, password }) => {
	return fetchWithRefresh('/auth/user', {
		method: 'PATCH',
		headers: {
			...apiConfig.headers,
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});
};
