import { useSelector } from 'react-redux';
import styles from './home.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
} from '@services/burger-ingredients/reducer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Preloader } from '@components/preloader/preloader';
import { TIngredient } from '@/utils/types';

export const HomePage = (): React.JSX.Element => {
	const ingredients: TIngredient[] = useSelector(getAllIngredients);
	const loading = useSelector(getIngredientsLoading);
	const error = useSelector(getIngredientsError);

	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				{loading ? (
					<Preloader />
				) : error ? (
					<span className='text text_type_main-medium'>
						Произошла ошибка при загрузке ингредиентов
					</span>
				) : ingredients && ingredients.length > 0 ? (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				) : (
					<span className='text text_type_main-medium'>Нет ингредиентов</span>
				)}
			</main>
		</>
	);
};
