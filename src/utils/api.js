const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients';

const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const getBurgerIngredients = () => {
	return fetch(ingredientsApiUrl).then(getResponse);
};
