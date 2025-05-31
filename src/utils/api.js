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

export const getBurgerIngredients = () => {
	return fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse);
};

export const createOrder = (ingredients) => {
	return fetch(`${apiConfig.baseUrl}/orders`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
			ingredients: ingredients,
		}),
	}).then(getResponse);
};
