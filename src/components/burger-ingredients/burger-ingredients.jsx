import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../burger-ingredients/ingredients-group/ingredients-group';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { getAllIngredients } from '@services/burger-ingredients/reducer';
import { getCurrentIngredient } from '@services/ingredient-detail/reducer';

export const BurgerIngredients = () => {
	const ingredients = useSelector(getAllIngredients);
	const ingredientTypes = [
		...new Set(ingredients.map((ingredient) => ingredient.type)),
	];
	const currentIngredient = useSelector(getCurrentIngredient);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>

			<ul className={`${styles.ingredients_group_list} custom-scroll mt-10`}>
				{ingredientTypes.map((type, index) => (
					<IngredientsGroup key={index} type={type} ingredients={ingredients} />
				))}
			</ul>

			{currentIngredient && (
				<Modal
					currentIngredient={currentIngredient}
					title={'Детали ингредиента'}>
					<IngredientDetails
						ingredient={ingredients.find(
							(ingredient) => ingredient._id === currentIngredient
						)}
					/>
				</Modal>
			)}
		</section>
	);
};
