import React from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../burger-ingredients/ingredients-group/ingredients-group';
import { ingredientPropType } from '@utils/prop-types.js';

export const BurgerIngredients = ({ ingredients }) => {
	const ingredientTypes = [
		...new Set(ingredients.map((ingredient) => ingredient.type)),
	];

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
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
