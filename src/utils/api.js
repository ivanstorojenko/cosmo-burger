const apiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
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
		headers: apiConfig.headers,
		body: JSON.stringify({
			ingredients: ingredients,
		}),
	});
};
