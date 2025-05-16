import React from 'react';
import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';

export const IngredientItem = ({
	name,
	price,
	image,
	setCurrentIngredient,
}) => {
	return (
		<li className={styles.ingredient_item_wrapper}>
			<button className={styles.ingredient_item} onClick={setCurrentIngredient}>
				<Counter count={1} size='default' extraClass='m-1' />
				<img src={image} alt={name} className={`${styles.image}`} />
				<div className={styles.price}>
					<span className='text text_type_digits-default mr-2'>{price}</span>
					<CurrencyIcon />
				</div>
				<h3 className={styles.title}>{name}</h3>
			</button>
		</li>
	);
};

IngredientItem.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	setCurrentIngredient: PropTypes.func.isRequired,
};
