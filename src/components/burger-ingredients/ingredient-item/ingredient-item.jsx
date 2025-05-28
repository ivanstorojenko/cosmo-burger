import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '@services/ingredient-detail/actions';

export const IngredientItem = ({ id, name, price, image }) => {
	const dispatch = useDispatch();

	const handleSetCurrentIngredient = () => {
		dispatch(setCurrentIngredient(id));
	};

	return (
		<li className={styles.ingredient_item_wrapper}>
			<button
				className={styles.ingredient_item}
				onClick={handleSetCurrentIngredient}>
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
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};
