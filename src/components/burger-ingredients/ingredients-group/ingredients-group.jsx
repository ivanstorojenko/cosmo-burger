import { useSelector } from 'react-redux';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
import * as PropTypes from 'prop-types';
import {
	getAllIngredients,
	getIngredientTypes,
} from '@services/burger-ingredients/reducer';

export const IngredientsGroup = ({ type }) => {
	const ingredients = useSelector(getAllIngredients);
	const ingredientTypes = useSelector(getIngredientTypes);
	const typeName = ingredientTypes.find((item) => item.type === type).name;
	const ingredientsInType = ingredients.filter(
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

IngredientsGroup.propTypes = {
	type: PropTypes.oneOf(['bun', 'main', 'sauce']),
};
