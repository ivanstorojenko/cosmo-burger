import { useSelector } from 'react-redux';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getAllIngredients } from '@services/burger-ingredients/reducer';
// @ts-expect-error: Could not find a declaration file for module '@services/burger-ingredients/reducer'.
import { getIngredientTypes } from '@services/burger-ingredients/reducer';
import { TIngredient, TIngredientCategory } from '@/utils/types';

type TIngredientsGroupProps = {
	type: string;
};

export const IngredientsGroup = ({
	type,
}: TIngredientsGroupProps): JSX.Element => {
	const ingredients: Array<TIngredient> = useSelector(getAllIngredients);
	const ingredientTypes: Array<TIngredientCategory> =
		useSelector(getIngredientTypes);
	const typeName: string =
		ingredientTypes.find((item) => item.type === type)?.name ||
		'Неизвестная категория';
	const ingredientsInType: Array<TIngredient> = ingredients.filter(
		(ingredient) => ingredient.type === type
	);

	return (
		<li className={styles.ingredient_group}>
			<h2 className='text text_type_main-medium'>{typeName}</h2>
			<ul className={`${styles.ingredient_list} pr-4 pl-4`}>
				{ingredientsInType.map((ingredient) => (
					<IngredientItem key={ingredient._id} ingredient={ingredient} />
				))}
			</ul>
		</li>
	);
};
