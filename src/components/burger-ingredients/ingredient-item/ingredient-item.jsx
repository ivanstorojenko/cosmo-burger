import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '@services/ingredient-detail/actions';
import { useDrag } from 'react-dnd';
import { ingredientPropType } from '@utils/prop-types';
import { getConstructorIngredients } from '@services/burger-constructor/reducer';

export const IngredientItem = ({ ingredient }) => {
	const { _id, type, name, price, image } = ingredient;
	const dispatch = useDispatch();
	const constructorIngredients = useSelector(getConstructorIngredients);

	let counter = 0;
	if (type === 'bun') {
		counter = constructorIngredients.bun?._id === _id ? 2 : 0;
	} else {
		counter = constructorIngredients.ingredients.filter(
			(item) => item._id === _id
		).length;
	}

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
				{counter !== 0 && (
					<Counter count={counter} size='default' extraClass='m-1' />
				)}
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
