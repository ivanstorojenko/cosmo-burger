import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { loadIngredients } from '../../services/burger-ingredients/actions';
import {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
} from '../../services/burger-ingredients/reducer';

export const App = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const loading = useSelector(getIngredientsLoading);
	const error = useSelector(getIngredientsError);

	useEffect(() => {
		dispatch(loadIngredients());
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
						<BurgerIngredients />
						<BurgerConstructor />
					</>
				) : (
					<span className='text text_type_main-medium'>Нет ингредиентов</span>
				)}
			</main>
		</div>
	);
};
