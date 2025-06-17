import styles from './ingredient-item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientPropType } from '@utils/prop-types';
import { getConstructorIngredients } from '@services/burger-constructor/reducer';
import { useLocation, Link } from 'react-router';

export const IngredientItem = ({ ingredient }) => {
	const { _id, type, name, price, image } = ingredient;
	const constructorIngredients = useSelector(getConstructorIngredients);
	const location = useLocation();

	let counter = 0;
	if (type === 'bun') {
		counter = constructorIngredients.bun?._id === _id ? 2 : 0;
	} else {
		counter = constructorIngredients.ingredients.filter(
			(item) => item._id === _id
		).length;
	}

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ...ingredient },
	});

	return (
		<li ref={dragRef} draggable className={styles.ingredient_item_wrapper}>
			<Link
				to={`/ingredients/${_id}`}
				state={{ background: location }}
				className={styles.ingredient_item}>
				{counter !== 0 && (
					<Counter count={counter} size='default' extraClass='m-1' />
				)}
				<img
					src={image}
					alt={name}
					className={`${styles.image}`}
					width='211'
					height='106'
				/>
				<div className={styles.price}>
					<span className='text text_type_digits-default mr-2'>{price}</span>
					<CurrencyIcon />
				</div>
				<h3 className={styles.title}>{name}</h3>
			</Link>
		</li>
	);
};

IngredientItem.propTypes = {
	ingredient: ingredientPropType.isRequired,
};
