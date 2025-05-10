import React from 'react';
import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientItem = ({ key, name, price, image }) => {
	return (
		<li key={key} className={styles.ingredient_item}>
			<Counter count={1} size='default' extraClass='m-1' />
			<img src={image} alt={name} className={`${styles.image}`} />
			<div className={styles.price}>
				<span className='text text_type_digits-default mr-2'>{price}</span>
				<CurrencyIcon />
			</div>
			<h3 className={styles.title}>{name}</h3>
		</li>
	);
};
