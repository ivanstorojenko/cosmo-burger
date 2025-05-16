import React from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';

export const IngredientsGroup = ({
	type,
	ingredients,
	setCurrentIngredient,
}) => {
	const ingredientsInType = ingredients.filter(
		(ingredient) => ingredient.type === type
	);

	return (
		<li className={styles.ingredient_group}>
			<h2 className='text text_type_main-medium'>
				{type === 'bun' && 'Булки'}
				{type === 'main' && 'Начинки'}
				{type === 'sauce' && 'Соусы'}
			</h2>
			<ul className={`${styles.ingredient_list} pr-4 pl-4`}>
				{ingredientsInType.map((ingredient) => (
					<IngredientItem
						key={ingredient._id}
						name={ingredient.name}
						price={ingredient.price}
						image={ingredient.image}
						setCurrentIngredient={() => setCurrentIngredient(ingredient._id)}
					/>
				))}
			</ul>
		</li>
	);
};
