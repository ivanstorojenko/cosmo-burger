import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '@services/ingredient-detail/actions';
import { useDrag } from 'react-dnd';
import { ingredientPropType } from '@utils/prop-types';

export const IngredientItem = ({ ingredient }) => {
	const { _id, name, price, image } = ingredient;
	const dispatch = useDispatch();

	const handleSetCurrentIngredient = () => {
		dispatch(setCurrentIngredient(_id));
	};

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ...ingredient },
	});

	return (
		<li ref={dragRef} draggable className={styles.ingredient_item_wrapper}>
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
	ingredient: ingredientPropType.isRequired,
};
