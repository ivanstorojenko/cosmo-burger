import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';

export const App = () => {
	const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients';
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const ingredientsRes = await fetch(ingredientsApiUrl);
				if (!ingredientsRes.ok) {
					throw new Error(ingredientsRes.status);
				}
				const ingredientsJson = await ingredientsRes.json();

				setIngredients(ingredientsJson.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(err);
				console.error('Fetch ingredients', err);
			}
		})();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				{loading ? (
					<span className='text text_type_main-medium'>Загрузка...</span>
				) : error ? (
					<span className='text text_type_main-medium'>
						Произошла ошибка при загрузке ингредиентов
					</span>
				) : ingredients && ingredients.length > 0 ? (
					<>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredients} />
					</>
				) : (
					<span className='text text_type_main-medium'>Нет ингредиентов</span>
				)}
			</main>
		</div>
	);
};
