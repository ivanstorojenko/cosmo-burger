import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../burger-ingredients/ingredients-group/ingredients-group';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { ingredientPropType } from '@utils/prop-types.js';

export const BurgerIngredients = ({ ingredients }) => {
	const ingredientTypes = [
		...new Set(ingredients.map((ingredient) => ingredient.type)),
	];
	const [currentIngredient, setCurrentIngredient] = useState(null);

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
					<IngredientsGroup
						key={index}
						type={type}
						ingredients={ingredients}
						setCurrentIngredient={setCurrentIngredient}
					/>
				))}
			</ul>

			{currentIngredient && (
				<Modal
					currentIngredient={currentIngredient}
					setCurrentIngredient={() => setCurrentIngredient(null)}>
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

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
